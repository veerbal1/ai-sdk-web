import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { notificationSchema } from '@/features/stream-object-demo/lib/schema'; // Correct path alias
import { type NextRequest } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Ensure the OPENAI_API_KEY environment variable is set
if (!process.env.OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY environment variable is not set.');
  // Potentially throw an error or return a specific response in a real app
}

export async function POST(req: NextRequest) {
  try {
    // Expecting a simple string prompt in the body for this example
    const { prompt: promptContent } = await req.json();

    if (!promptContent || typeof promptContent !== 'string') {
        return new Response(JSON.stringify({ error: 'Invalid prompt in request body.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
    }

    const result = streamObject({
      model: openai('gpt-4o-mini'), // Using gpt-4o, adjust if needed
      schema: notificationSchema,
      prompt: `Generate 3 fictional notifications for a messages app based on this context: ${promptContent}`,
      // Example: Add other parameters if needed, like temperature, maxTokens, etc.
      // temperature: 0.7,
    });

    // Use toTextStreamResponse() as streamObject returns a StreamingObjectResponse
    return result.toTextStreamResponse();

  } catch (error) {
    console.error('[STREAM_OBJECT_API_ERROR]', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown server error occurred';
    return new Response(errorMessage, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }, // Return plain text error
    });
  }
}

// Handle GET requests or other methods if needed
export async function GET(request: NextRequest) {
  return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}
