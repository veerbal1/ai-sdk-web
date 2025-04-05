'use client';

import { useChat, type Message } from '@ai-sdk/react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import React from 'react';

export const ImageChatInterface = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/generate-image-chat', // Point to our new API route
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
        <CardTitle>AI Image Generation Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col overflow-hidden">
        <ScrollArea className="flex-grow h-full mb-4 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length > 0
              ? messages.map((m: Message) => (
                  <div key={m.id} className="whitespace-pre-wrap flex flex-col items-start">
                    <div className={"px-3 py-2 rounded-lg " + (m.role === 'user' ? 'bg-primary text-primary-foreground self-end' : 'bg-muted')}>
                      <span className="font-bold capitalize mr-2">{m.role}:</span>
                      {m.toolInvocations ? (
                        m.toolInvocations.map(ti => {
                          if (ti.toolName !== 'generateImage') return null;

                          // Display based on result state
                          if (ti.state === 'result') {
                            // Check if the result from our API tool execution contains an error
                            if (ti.result.error) {
                              return (
                                <div key={ti.toolCallId} className="my-2 text-red-500">(Error: {ti.result.error})</div>
                              );
                            }
                            // Display the generated image and prompt
                            return (
                              <div key={ti.toolCallId} className="my-2">
                                <p className="text-sm italic mb-1">(Prompt: {ti.result.prompt})</p>
                                <Image
                                  src={`data:image/png;base64,${ti.result.image}`}
                                  alt={ti.result.prompt || 'Generated Image'}
                                  width={400}
                                  height={400}
                                  className="rounded-md border"
                                />
                              </div>
                            );
                          } 
                          // Otherwise (intermediate states like 'in_progress'), show loading
                          else {
                            return (
                              <div key={ti.toolCallId} className="my-2 animate-pulse">(Generating image...)</div>
                            );
                          }
                        })
                      ) : (
                        <span>{m.content}</span>
                      )}
                    </div>
                  </div>
                ))
              : (
                <p className="text-muted-foreground"></p>
              )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex items-center space-x-2 pt-4 border-t">
          <Input
            className="flex-grow"
            value={input}
            placeholder="Ask for an image, e.g., 'Generate an image of a cat wearing a hat'"
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>Send</Button>
        </form>
      </CardContent>
    </Card>
  );
}; 