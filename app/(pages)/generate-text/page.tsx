import { GenerateTextForm } from '@/features/text-generation/components/GenerateTextForm';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { CodeSnippet } from '@/shared/components/ui/CodeSnippet';

// Core client-side snippet for display
const clientSnippet = /* ... existing snippet string ... */ `'use client';
import { useState } from 'react';
// ...other imports & component setup...

const [prompt, setPrompt] = useState(\'...');
const [generation, setGeneration] = useState(\'\');
const [isLoading, setIsLoading] = useState(false);

const handleGenerate = async () => {
    setIsLoading(true);
    setGeneration(\'\');
    try {
        // Make POST request to the API endpoint
        const response = await fetch(\'/api/generate-text\', {
            method: \'POST\',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt } as any),
        });
        // ...check response.ok...

        // Set the generated text from response
        const result = await response.json();
        setGeneration(result.text);
    } catch (error) {
        // ...handle error...
    } finally {
        setIsLoading(false);
    }
};

// ...return JSX with Textarea, Button, etc...`;

// Core server-side snippet for display
const serverSnippet = /* ... existing snippet string ... */ `import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        // Extract prompt from request body
        const { prompt } = await req.json();

        // ...input validation...

        // Call the Vercel AI SDK
        const { text } = await generateText({
            model: openai('gpt-4o-mini'), // Use your preferred model
            system: 'You are a helpful assistant.',
            prompt: prompt,
        });

        // Respond with the generated text
        return NextResponse.json({ text });

    } catch (error) {
        // ...error handling...
        return NextResponse.json(/* ... */);
    }
}`;

const GenerateTextPage = () => {
    return (
        <div className="container mx-auto py-10 space-y-8">
            {/* Explanatory Section */}
            <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
                <CardHeader>
                    <CardTitle className="text-blue-900 dark:text-blue-100">Understanding This Example: Text Generation</CardTitle>
                    <CardDescription className="text-blue-700 dark:text-blue-300">
                        How this page uses the Vercel AI SDK to generate text dynamically.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-blue-800 dark:text-blue-200 space-y-3">
                    <div>
                        <strong className="block mb-1">Implementation Steps:</strong>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>User enters a prompt in the <strong>Client Component</strong> (<code>GenerateTextForm.tsx</code>).</li>
                            <li>The client sends this prompt to a Next.js <strong>API Route</strong> (<code>/api/generate-text</code>).</li>
                            <li>The API route uses the <code>generateText</code> function from the Vercel AI SDK, passing the prompt to an AI model (e.g., OpenAI).</li>
                            <li>The AI model generates text based on the prompt.</li>
                            <li>The API route sends the generated text back to the client.</li>
                            <li>The client component displays the received text (rendered via the <code>Markdown</code> component).</li>
                        </ol>
                    </div>
                    <div>
                        <strong className="block mb-1">Usefulness & Applications:</strong>
                        <p>
                            This pattern allows for dynamic content creation, intelligent responses, summarization, translation, and more. It powers features like chatbots, content generators, personalized experiences, automated reporting, and educational tools.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Interactive Feature Component */}
            <GenerateTextForm />

            {/* Core Code Snippets for Explanation */}
            <div className="space-y-6">
                {/* ... existing Card components for snippets ... */}
                <Card>
                    <CardHeader>
                        <CardTitle>Client Logic Snippet (Core)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CodeSnippet code={clientSnippet} language="tsx" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>API Route Logic Snippet (Core)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CodeSnippet code={serverSnippet} language="typescript" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default GenerateTextPage;