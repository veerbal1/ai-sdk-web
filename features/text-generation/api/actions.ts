"use server";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { getPageMetadata } from "@/shared/lib/metadata";

export async function generateTextResponse(prompt: string) {
  if (!prompt) {
    throw new Error("Prompt is required");
  }

  try {
    const { text, sources } = await generateText({
      model: openai.responses("gpt-4o-mini"),
      prompt,
      tools: {
        web_search_preview: openai.tools.webSearchPreview(),
      },
    });

    // Fetch metadata for each source
    const sourcesWithMetadata = await Promise.all(
      sources.map(async (source) => {
        const metadata = await getPageMetadata(source.url);
        return {
          ...source,
          title: source.title || metadata?.title || source.url,
          image: metadata?.image,
        };
      })
    );

    return { text, sources: sourcesWithMetadata };
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text");
  }
}
