'use client';

import React from 'react';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { notificationSchema } from '@/features/stream-object-demo/lib/schema'; // Correct path alias
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from '@/shared/components/ui/scroll-area';

export const StreamObjectInterface = () => {
  const [promptInput, setPromptInput] = React.useState<string>('Messages during the start of the school holidays');

  const { object, submit, isLoading, error, stop } = useObject({
    api: '/api/stream-object-demo', // Point to our new API route
    schema: notificationSchema,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Pass the prompt as part of the body to the API route
    submit({ prompt: promptInput });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto flex flex-col">
      <CardHeader>
        <CardTitle>Stream Object Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Input
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="Enter context for notifications..."
            disabled={isLoading}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading || !promptInput.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Generate'}
          </Button>
        </form>

        {isLoading && (
          <div className="flex items-center justify-between p-2 border rounded-md bg-muted">
            <span>Loading...</span>
            <Button variant="destructive" size="sm" onClick={() => stop()}>
              Stop
            </Button>
          </div>
        )}

        {error && (
          <div className="text-red-600 p-2 border border-red-300 bg-red-50 rounded-md">
            <strong>Error:</strong> {error.message}
          </div>
        )}

        <ScrollArea className="h-[300px] w-full border rounded-md p-4 bg-background">
          <div className="space-y-3">
            {object?.notifications?.length === 0 && !isLoading && (
              <p className="text-muted-foreground text-center">No notifications generated yet. Click generate!</p>
            )}
            {object?.notifications?.map((notification, index) => (
              <div key={index} className="p-3 border rounded-md shadow-sm bg-card">
                <p className="font-semibold">{notification?.name ?? <span className="italic text-muted-foreground">Loading name...</span>}</p>
                <p className="text-sm">{notification?.message ?? <span className="italic text-muted-foreground">Loading message...</span>}</p>
                {notification?.timestamp && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
