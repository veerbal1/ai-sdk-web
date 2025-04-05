'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { Markdown } from '@/shared/components/ui/markdown';

export const GenerateTextForm = () => {
  const [prompt, setPrompt] = useState('Why sun is hot?');
  const [generation, setGeneration] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneration(''); // Clear previous generation

    try {
      const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `HTTP error! status: ${response.status}` }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setGeneration(result.text);
    } catch (error: unknown) {
      console.error('Failed to generate text:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setGeneration(`Failed to generate text: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Generate Text</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="prompt-textarea">Enter Prompt:</Label>
          <Textarea
            id="prompt-textarea"
            value={prompt}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            rows={4}
            className="min-h-[80px]"
            disabled={isLoading}
          />
        </div>
        <Button onClick={handleGenerate} disabled={isLoading || !prompt.trim()}>
          {isLoading ? 'Generating...' : 'Generate Text'}
        </Button>
        {generation && (
          <div className="mt-4 p-4 border rounded-md bg-secondary/50">
            <h4 className="font-semibold mb-2 text-sm">Generated Text:</h4>
            <Markdown content={generation} />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Using Vercel AI SDK and OpenAI.</p>
      </CardFooter>
    </Card>
  );
}; 