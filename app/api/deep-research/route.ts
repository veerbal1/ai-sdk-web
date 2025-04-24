import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export const POST = async (req: NextRequest) => {
  const { messages } = await req.json();
  const stream = await streamText({
    model: google("gemini-2.0-flash-001"),
    messages,
  });

  return stream.toDataStreamResponse();
};
