'use client';

import { useState } from 'react';
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Markdown } from "@/shared/components/ui/markdown";
import { Loader2 } from "lucide-react";
import { TextGenerationResponse } from "../types";
import { SourceCard } from "./SourceCard";
import { ScrollArea, ScrollBar } from "@/shared/components/ui/scroll-area";

export function TextGeneratorForm() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<TextGenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to generate response');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Demo - Web Search Agent</CardTitle>
          <CardDescription>
            Ask any question and get real-time information with sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="What happened in New York yesterday?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !prompt}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-500">
          <CardContent className="pt-6 text-red-500">
            {error}
          </CardContent>
        </Card>
      )}

      {response && (
        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-0">
            {response.sources && response.sources.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 px-6">Sources</h3>
                <ScrollArea className="whitespace-nowrap px-6 pb-10" >
                  <div className="flex gap-4">
                    {response.sources.map((source, index) => (
                      <SourceCard key={index} source={source} />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            )}
            <div className="px-6">
              <Markdown content={response.text} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 