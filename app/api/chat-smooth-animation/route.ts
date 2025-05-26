import { NextRequest } from "next/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const POST = async (req: NextRequest) => {
  const { messages } = await req.json();
  const response = await streamText({
    model: openai("gpt-4.1-mini"),
    messages,
  });

  return response.toDataStreamResponse();
};
