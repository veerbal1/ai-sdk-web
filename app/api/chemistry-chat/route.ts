import { anthropic, AnthropicProviderOptions } from "@ai-sdk/anthropic";
import { streamText, tool } from "ai";
import { z } from "zod";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.X_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.X_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.X_AWS_SECRET_ACCESS_KEY!,
  },
});

const S3_BUCKET_NAME = process.env.X_AWS_BUCKET_NAME!;

export const POST = async (req: Request) => {
  const { messages } = await req.json();

  console.log("Chemistry Chat Messages", messages);

  const response = await streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: `You are a chemistry expert AI assistant specializing in molecular structures, chemical reactions, and chemistry education. Your expertise includes:

- Molecular structure analysis and diagrams
- Chemical bonding and intermolecular forces
- Organic and inorganic chemistry
- Chemical reactions and mechanisms
- IUPAC nomenclature
- Stereochemistry and isomerism
- Thermodynamics and kinetics
- Spectroscopy and analytical methods

When discussing molecular structures:
- Provide clear, accurate descriptions of molecular geometry
- Explain bonding patterns and electron arrangements
- Use proper chemical notation and formulas
- Describe 3D structures when relevant
- Explain functional groups and their properties

Always prioritize scientific accuracy and provide educational explanations that help users understand complex chemistry concepts. Use clear, accessible language while maintaining scientific rigor.

When users ask about molecule structures or want to see molecular diagrams, use the moleculeStructureImage tool to generate and show them the molecular structure images.`,
    messages,
    providerOptions: {
      anthropic: {
        thinking: { type: "enabled", budgetTokens: 15000 },
      } satisfies AnthropicProviderOptions,
    },
    headers: {
      "anthropic-beta": "interleaved-thinking-2025-05-14",
    },
    tools: {
      moleculeStructureImage: tool({
        description: "Generate and display molecular structure images from SMILES notation with the help of RDKit. This tool creates visual representations of molecules and displays them in the chat. This tool is only available when users ask about molecule structures or want to see molecular diagrams.",
        parameters: z.object({
          smiles: z
            .array(z.string())
            .describe("Array of SMILES strings representing the molecules, e.g., ['CCO', 'CC(=O)O', 'c1ccccc1']"),
          legends: z
            .array(z.string())
            .describe("Array of legend labels for each molecule, e.g., ['Ethanol', 'Acetic Acid', 'Benzene']"),
          mols_per_row: z
            .number()
            .describe("Number of molecules to display per row")
            .default(2),
          sub_img_size: z
            .number()
            .describe("Size of each molecular image in pixels")
            .default(300),
        }),
        execute: async ({ smiles, legends, mols_per_row, sub_img_size }) => {
          try {
            console.log("Generating molecule structure image for:", { smiles, legends });
            
            // Call the FastAPI endpoint to generate the molecule image
            const response = await fetch(
              `http://localhost:8000/generate-molecules-image`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  smiles,
                  legends,
                  mols_per_row,
                  sub_img_size,
                }),
              }
            );

            if (!response.ok) {
              throw new Error(`FastAPI error: ${response.status} ${response.statusText}`);
            }

            const imageBlob = await response.blob();
            const imageBuffer = await imageBlob.arrayBuffer();
            
            // Generate unique filename
            const timestamp = Date.now();
            const uniqueId = uuidv4().substring(0, 8);
            const filename = `molecules/molecule-${timestamp}-${uniqueId}.png`;
            
            // Upload to S3
            const uploadCommand = new PutObjectCommand({
              Bucket: process.env.X_AWS_BUCKET_NAME!,
              Key: filename,
              Body: new Uint8Array(imageBuffer),
              ContentType: "image/png",
              ContentDisposition: `inline; filename="molecule-structure.png"`,
              CacheControl: "public, max-age=31536000", // Cache for 1 year
            });

            await s3Client.send(uploadCommand);
            
            // Generate signed URL (valid for 24 hours)
            const getObjectCommand = new GetObjectCommand({
              Bucket: process.env.X_AWS_BUCKET_NAME!,
              Key: filename,
            });
            
            const signedUrl = await getSignedUrl(s3Client, getObjectCommand, {
              expiresIn: 86400, // 24 hours in seconds
            });
            
            console.log("Molecule image uploaded to S3 with signed URL:", signedUrl);
            
            return {
              success: true,
              imageUrl: signedUrl,
              filename: filename,
              molecules: legends.length > 0 ? legends : smiles,
              message: `Generated molecular structure image for: ${legends.length > 0 ? legends.join(", ") : smiles.join(", ")}`,
              expiresIn: "24 hours",
            };
            
          } catch (error) {
            console.error("Error generating molecule image:", error);
            return {
              success: false,
              error: error instanceof Error ? error.message : "Unknown error occurred",
              message: "Failed to generate molecular structure image. Please check the SMILES notation and try again.",
            };
          }
        },
      }),
    },
  });

  return response.toDataStreamResponse({
    sendReasoning: true,
  });
};
