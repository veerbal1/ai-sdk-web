import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { cached } from '@/lib/middleware'; // Import the cached middleware

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Wrap the OpenAI model with the cached middleware
    const model = cached(openai('gpt-4o-mini'));

    const result = await streamText({
      model: model, // Use the cached model
      system: 'You are a helpful assistant.',
      messages,
    });

    // Respond with the stream
    return result.toDataStreamResponse();
  } catch (error) {
    // Handle potential errors, e.g., invalid request body
    if (error instanceof SyntaxError) {
      return new Response('Invalid JSON', { status: 400 });
    }
    console.error('Error in chat API:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 