import { google } from "@ai-sdk/google";
import { generateText, streamText, tool } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  const prompt = `Get the temperature in New York City and Chicago (in Fahrenheit) and add them together`;

  const stream = await streamText({
    model: google("gemini-2.0-flash-001"),
    prompt,
    tools: {
      weather: tool({
        description: "Get the temperature in a city (in Celsius)",
        parameters: z.object({
          city: z.string(),
        }),
        execute: async ({ city }) => {
          const temperature = Math.floor(Math.random() * 100);

          console.log("Temperature in: ", city, temperature);

          return {
            city,
            temperature,
          };
        },
      }),
      add: tool({
        description: "Add two numbers",
        parameters: z.object({
          a: z.number(),
          b: z.number(),
        }),
        execute: async ({ a, b }) => {
          const sum = a + b;

          console.log("Sum of: ", a, b, sum);

          return sum;
        },
      }),
      convertTemperature: tool({
        description: "Convert temperature from Celsius to Fahrenheit",
        parameters: z.object({
          temperature: z.number(),
        }),
        execute: async ({ temperature }) => {
          const fahrenheit = (temperature * 9) / 5 + 32;

          console.log("Temperature in Fahrenheit: ", temperature, fahrenheit);

          return fahrenheit;
        },
      }),
    },
    toolChoice: "auto",
    maxSteps: 10,
  });

  return stream.toDataStreamResponse();
};
