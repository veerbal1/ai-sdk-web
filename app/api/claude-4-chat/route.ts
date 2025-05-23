import { anthropic, AnthropicProviderOptions } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const POST = async (req: Request) => {
  const { messages } = await req.json();

  console.log("Messages", messages);
  const response = await streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    messages,
    providerOptions: {
      anthropic: {
        thinking: { type: "enabled", budgetTokens: 15000 },
      } satisfies AnthropicProviderOptions,
    },
    headers: {
      "anthropic-beta": "interleaved-thinking-2025-05-14",
    },
  });

  return response.toDataStreamResponse({
    sendReasoning: true,
  });
};
