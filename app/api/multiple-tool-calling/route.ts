import { google } from "@ai-sdk/google";
import { streamText, tool, type Tool } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for the tool parameters
const executeDynamicFunctionSchema = z.object({
  functionString: z
    .string()
    .describe(
      "A string containing the JavaScript function definition (e.g., '(a, b) => a + b' or 'function add(a, b) { return a + b; }'). Must be a valid function expression or declaration."
    ),
  argumentsJsonString: z
    .string()
    .describe(
      "A JSON string representing an array of arguments to pass to the function (e.g., '[1, 2]')."
    ),
});

// Define the type for the tool's execute function arguments
type ExecuteDynamicFunctionArgs = z.infer<typeof executeDynamicFunctionSchema>;

export const POST = async (req: NextRequest) => {
  const { messages } = await req.json();

  const stream = await streamText({
    model: google("gemini-2.5-pro-exp-03-25"),
    system: `You are a helpful assistant. You have access to a special tool called 'executeDynamicFunction'.
             If the user asks for a calculation or operation for which you don't have a built-in capability or a specific tool,
             you can define a JavaScript function as a string and provide arguments as a JSON string to this tool.
             The tool will execute the function and return the result.
             For example, to calculate the distance between two coordinates, you could provide a function string implementing the Haversine formula, it can be any calculation you need.
             and a JSON string with the latitude/longitude pairs as arguments.
           
             Dont hallucinate, dont tell user i will call a function, just call the function.
             
             Always create a function when you need to perform a calculation or operation not covered by other tools.
             `,
    messages,
    tools: {
      executeDynamicFunction: tool({
        description:
          "Dynamically executes a JavaScript function string with JSON string arguments. Use this when you need to perform a calculation or operation not covered by other tools.",
        parameters: executeDynamicFunctionSchema,
        execute: async ({
          functionString,
          argumentsJsonString,
        }: ExecuteDynamicFunctionArgs) => {
          try {
            const dynamicFunction = new Function(
              `return (${functionString})`
            )();

            if (typeof dynamicFunction !== "function") {
              throw new Error(
                "Provided string did not evaluate to a function."
              );
            }

            const args = JSON.parse(argumentsJsonString);

            if (!Array.isArray(args)) {
              throw new Error(
                "Arguments must be provided as a JSON array string."
              );
            }

            const result = await Promise.resolve(dynamicFunction(...args));

            return {
              status: "success",
              result: result,
            };
          } catch (error: unknown) {
            console.error("Error executing dynamic function:", error);
            const errorMessage =
              error instanceof Error
                ? error.message
                : "An unknown error occurred";
            return {
              status: "error",
              error: `Failed to execute function: ${errorMessage}`,
            };
          }
        },
      }),
    },
    toolChoice: "auto",
    maxSteps: 10,
  });

  return stream.toDataStreamResponse();
};
