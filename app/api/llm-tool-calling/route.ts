import { streamText, generateText, type ToolInvocation } from "ai";
import { openai } from "@ai-sdk/openai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";
import { type NextRequest } from "next/server";
import { type Message } from "@/features/llm-tool-calling/types";
import { veerbalInformation } from "@/shared/config/veerbal";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await req.json();

    const result = streamText({
      model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
      system:
        "You are a helpful assistant that can provide information about Veerbal Singh, a Full Stack Engineer.",
      messages,
      tools: {
        getVeerbalInfo: {
          description:
            "Get information about Veerbal Singh based on the specified category",
          parameters: z.object({
            category: z
              .enum([
                "personal",
                "professional",
                "experience",
                "education",
                "skills",
                "projects",
                "languages",
              ])
              .describe("The category of information to retrieve"),
            query: z
              .string()
              .describe("The specific question or topic being asked about"),
          }),
          execute: async ({ category, query }) => {
            const result = await generateText({
              model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
              system: `You are an information extraction specialist. Extract relevant information from the provided text about Veerbal Singh that would answer the user's query. Focus on accuracy and completeness.`,
              messages: [
                {
                  role: "user",
                  content: `Category: ${category}\nQuery: ${query}\n\nInformation to extract from:\n${veerbalInformation}`,
                },
              ],
              temperature: 0.1,
              maxTokens: 1000,
            });

            return {
              category,
              query,
              information: result.text.trim(),
            };
          },
        },
        getCurrentDate: {
          description: "Get the current date in a formatted way",
          parameters: z.object({
            format: z
              .enum(["full", "short", "iso"])
              .optional()
              .describe("The format of the date to return"),
          }),
          execute: async ({ format = "full" }) => {
            const now = new Date();
            let formattedDate: string;

            switch (format) {
              case "full":
                formattedDate = now.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                break;
              case "short":
                formattedDate = now.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
                break;
              case "iso":
                formattedDate = now.toISOString().split("T")[0];
                break;
              default:
                formattedDate = now.toLocaleDateString();
            }

            return {
              date: formattedDate,
              timestamp: now.getTime(),
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            };
          },
        },
      },
      maxSteps: 10,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("[LLM_TOOL_CALLING_API_ERROR]", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown server error occurred";
    return new Response(errorMessage, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
