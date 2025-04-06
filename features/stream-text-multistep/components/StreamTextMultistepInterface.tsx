'use client';

import React from 'react';
import { useChat, type Message } from '@ai-sdk/react'; // Import useChat and Message type
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { ScrollArea } from '@/shared/components/ui/scroll-area';

// Basic Client Component structure
export const StreamTextMultistepInterface = () => {
  // Use the useChat hook, pointing to our multi-step API route
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/stream-text-multistep',
  });

  // Ref for scrolling to bottom
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Card className="w-full max-w-2xl mx-auto flex flex-col h-[70vh]">
      <CardHeader>
        <CardTitle>Stream Text Multi-Step</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col overflow-hidden">
        <ScrollArea className="flex-grow h-full mb-4 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length > 0
              ? messages.map((m: Message) => (
                  <div key={m.id} className="whitespace-pre-wrap flex flex-col items-start">
                    <div className={"px-3 py-2 rounded-lg " + (m.role === 'user' ? 'bg-primary text-primary-foreground self-end' : 'bg-muted')}>
                      <span className="font-bold capitalize mr-2">{m.role}:</span>
                      {/* Render message parts, handling text and tool invocations */}
                      {m.parts?.map((part, index) => {
                        switch (part.type) {
                          case 'text':
                            // Render the streamed text content
                            return <span key={index}>{part.text}</span>;
                          case 'tool-invocation':
                            // Render a user-friendly indicator for the tool call
                            // Avoid showing the raw JSON details
                            return (
                              <span key={index} className="text-xs text-muted-foreground italic block my-1">
                                (Calling tool: {part.toolInvocation.toolName}...)
                              </span>
                            );
                          // Add cases for other part types if needed (e.g., 'tool-result')
                          default:
                            // Handle potential future part types gracefully
                            return null;
                        }
                      })}
                    </div>
                  </div>
                ))
              : (
                <p className="text-muted-foreground">Enter a message to start the multi-step process.</p>
              )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 w-full">
          <Input
            className="flex-grow"
            value={input}
            placeholder="Ask something... e.g., 'Plan a trip to Paris'"
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
}; 