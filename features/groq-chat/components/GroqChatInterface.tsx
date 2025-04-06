'use client';

import React from 'react';
import { useChat, type Message } from '@ai-sdk/react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { SendHorizonal } from 'lucide-react';
import { Markdown } from '@/shared/components/ui/markdown';

export const GroqChatInterface = () => {
  // Use the useChat hook, pointing to our groq chat API route
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/groq-chat', // Point to the renamed API route
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
        <CardTitle>Groq Chatbot</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col overflow-hidden">
        <ScrollArea className="flex-grow h-full mb-4 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length > 0
              ? messages.map((m: Message) => (
                  <div key={m.id} className="flex flex-col items-start">
                    <div
                      className={`px-3 py-2 rounded-lg max-w-[85%] ${m.role === 'user' ? 'bg-primary text-primary-foreground self-end' : 'bg-muted'}`}
                    >
                      <span className="font-bold capitalize mr-2 block">
                        {m.role === 'user' ? 'You' : 'Assistant'}:
                      </span>
                      {m.role === 'assistant' ? (
                        <Markdown content={m.content} />
                      ) : (
                        <span>{m.content}</span>
                      )}
                    </div>
                  </div>
                ))
              : (
                <p className="text-muted-foreground text-center">Start the conversation by typing below.</p>
              )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 w-full">
          <Input
            className="flex-grow"
            value={input}
            placeholder="Ask anything..."
            onChange={handleInputChange}
            disabled={isLoading}
            aria-label="Chat input"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon" aria-label="Send message">
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
