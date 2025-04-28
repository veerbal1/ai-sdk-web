import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { messages } = await req.json();
  const stream = await streamText({
    model: google("gemini-2.0-flash-001"),
    messages,
  });

  return stream.toDataStreamResponse();
};
