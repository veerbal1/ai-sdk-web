import { openai } from '@ai-sdk/openai';
import { experimental_generateImage, Message, streamText, tool } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { messages }: { messages: Message[] } = await req.json();

  // Filter message history to remove base64 image data before sending to the model
  const filteredMessages = messages.map(m => {
    if (m.role === 'assistant' && m.toolInvocations) {
      return {
        ...m,
        toolInvocations: m.toolInvocations.map(ti => {
          if (ti.toolName === 'generateImage' && ti.state === 'result') {
            // Create a new object for the tool invocation with image redacted
            return { ...ti, result: { ...ti.result, image: 'redacted-for-model' } };
          }
          return ti;
        }
        ),
      };
    }
    return m;
  });

  const result = streamText({
    model: openai('gpt-4o-mini'), // Use a model that supports tool use
    messages: filteredMessages,
    tools: {
      generateImage: tool({
        description: 'Generate an image based on a prompt',
        parameters: z.object({
          prompt: z.string().describe('The detailed prompt for image generation.'),
        }),
        execute: async ({ prompt }) => {
          try {
            // Destructure only 'image' as finishReason is not returned
            const { image } = await experimental_generateImage({
              model: openai.image('dall-e-3'), // Or dall-e-2
              prompt,
              // You might need to adjust size/quality/style based on the model
              // size: '1024x1024', 
            });

            // console.log('Image Generation Finish Reason:', finishReason); // Removed this line

            // IMPORTANT: In production, upload to blob storage (e.g., Vercel Blob, S3)
            // and return the URL instead of the base64 string.
            return { image: image.base64, prompt };
          } catch (error) {
            console.error("Error generating image:", error);
            // Communicate the error back to the LLM/user if possible
            // Returning an error structure might be better than throwing
            return { error: "Failed to generate image. Please try again." };
          }
        },
      }),
    },
  });

  // Respond with the stream
  return result.toDataStreamResponse();
} 