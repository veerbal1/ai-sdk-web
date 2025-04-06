'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

// Basic Client Component structure
export const StreamTextMultistepInterface = () => {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setResult(''); // Clear previous results

    // Placeholder for API call logic
    // In a real scenario, this would call the '/api/stream-text-multistep' endpoint
    // and handle the streaming response.
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

    setResult('Placeholder result from multi-step text generation.');
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Multi-Step Text Stream</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Start Generation'}
          </Button>
          <div className="p-4 border rounded-md min-h-[100px] bg-muted">
            <p className="whitespace-pre-wrap">
              {result || <span className="text-muted-foreground">Click the button to start...</span>}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 