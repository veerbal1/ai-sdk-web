import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextRequest, NextResponse } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { prompt }: { prompt: string } = await req.json();

    // Basic input validation
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid prompt provided.' }, { status: 400 });
    }

    const { text, finishReason, usage } = await generateText({
      model: openai('gpt-4o-mini'), // Or your preferred model
      system: 'You are a helpful assistant.',
      prompt: prompt,
    });

    console.log('AI Generation Usage:', usage);
    console.log('AI Generation Finish Reason:', finishReason);

    return NextResponse.json({ text });

  } catch (error) {
    console.error('Error in generate-text API:', error);

    // Provide a generic error response
    let errorMessage = 'An unexpected error occurred.';
    let statusCode = 500;

    // You could potentially check error types here for more specific responses
    // e.g., if (error instanceof OpenAI.APIError) { ... }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
} 