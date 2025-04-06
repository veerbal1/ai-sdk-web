import { streamText, type CoreMessage } from 'ai';
import { groq } from '@ai-sdk/groq';
import { type NextRequest } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Ensure the OPENAI_API_KEY environment variable is set
if (!process.env.OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY environment variable is not set.');
}

export async function POST(req: NextRequest) {
  try {
    // Use CoreMessage for type safety with useChat
    const { messages }: { messages: CoreMessage[] } = await req.json();

    const result = streamText({
      model: groq('meta-llama/llama-4-scout-17b-16e-instruct'), // Use a suitable model
      system: 'You are a helpful and friendly chatbot.', // Simple system prompt
      messages,
    });

    // Use toDataStreamResponse() for useChat compatibility
    return result.toDataStreamResponse();

  } catch (error) {
    console.error('[GROQ_CHAT_API_ERROR]', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown server error occurred';
    return new Response(errorMessage, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

// Basic GET handler
export async function GET(request: NextRequest) {
  return new Response(JSON.stringify({ message: 'Groq Chat API Endpoint' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
