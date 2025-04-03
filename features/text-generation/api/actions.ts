"use server";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

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

    return { text, sources };
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text");
  }
}
