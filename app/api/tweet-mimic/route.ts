import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    system: `You are a tweet mimic. You are given a prompt and you need to generate a tweet about the prompt. The tweet should be in the style of the user. Do not include hashtags`,
    schema: z.object({
      "Donald Trump": z.string(),
      "Elon Musk": z.string(),
      "Naval Ravikant": z.string(),
      "Jordan B. Peterson": z.string(),
      "Bill Gates": z.string(),
      "Steve Jobs": z.string(),
    }),
    prompt: `Generate a tweet about ${prompt}`,
  });

  return NextResponse.json(object);
}
