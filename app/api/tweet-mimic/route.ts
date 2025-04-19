import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: z.object({
      tweet: z.string(),
    }),
    prompt: `Generate a tweet about ${prompt}`,
  });

  return NextResponse.json(object);
}
