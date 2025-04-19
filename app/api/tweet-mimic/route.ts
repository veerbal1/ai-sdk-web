import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z, ZodTypeAny } from "zod";
import { NextRequest, NextResponse } from "next/server";
import {
  TONE_STYLES,
  ToneStyleKey,
} from "@/features/tweet-mimic/constants/toneStyles";

const dynamicSchema = z.object(
  (Object.keys(TONE_STYLES) as ToneStyleKey[]).reduce((acc, key) => {
    acc[key] = z.string().describe(`Generated tweet in the style of ${key}`);
    return acc;
  }, {} as Record<ToneStyleKey, ZodTypeAny>)
);

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  console.log("Step 1 - Started");
  // Step 1: Generate text with potential web search enrichment
  const { text, sources } = await generateText({
    model: openai.responses("gpt-4o-mini"),
    prompt: `Do latest web search for "${prompt}"`,
    tools: {
      web_search_preview: openai.tools.webSearchPreview(),
    },
  });
  // Note: sources are available in the 'text' response if needed, but not used here.

  // Step 2: Generate tweets based on the enriched text

  // Construct the system prompt dynamically
  const systemPrompt = `You are a tweet mimic. You are given a prompt/topic and potentially relevant text fetched from the web. Generate a tweet about the topic for each of the following personalities, strictly adhering to their specified tone style, using the provided text as context if relevant. Do not include hashtags. Respond with a JSON object where keys are the personality names and values are the generated tweets.

${Object.entries(TONE_STYLES)
  .map(([name, style]) => `Personality: ${name}\nTone Style: ${style}\n`)
  .join("\n")}`;

  // Construct the prompt for generateObject, including the original prompt and the generated text
  const objectPrompt = `Original Prompt: ${prompt}\n\nContext Text: ${text}\n\nPlease generate tweets based on this information.`;

  const { object } = await generateObject({
    model: openai.responses("gpt-4o-mini"),
    prompt: objectPrompt, // Use the combined prompt
    system: systemPrompt,
    schema: dynamicSchema, // Use the dynamically generated schema
  });

  // Return only the object
  return NextResponse.json({ tweets: object, sources });
}
