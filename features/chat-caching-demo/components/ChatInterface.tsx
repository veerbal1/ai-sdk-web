'use client';

import { useChat } from '@ai-sdk/react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { useRef } from 'react';
import { Markdown } from '@/shared/components/ui/markdown';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Avatar } from '@/shared/components/ui/avatar';
import { Send } from 'lucide-react';

/**
 * Renders a chat interface demonstrating caching, with auto-scrolling.
 */
export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/chat-cached'
      // The default /api/chat endpoint is used, which includes caching
    });

  // Ref for the scroll area container
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  // Ref for the element at the bottom of the messages list
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom whenever messages change
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
      <Card className="w-full mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Chat Caching Demo</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Interact with the AI. Responses will be cached locally in .cache/ai-cache.json. Clear this file for fresh
            responses.
          </CardDescription>
          <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-xs">
            <strong>Note:</strong> This caching is for development/testing only.
          </div>
        </CardHeader>
      </Card>

      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 flex flex-col p-4 h-[60vh]">
          <ScrollArea className="flex-1 pr-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Start a conversation by typing a message below.
              </div>
            ) : (
              <div className="space-y-4 pt-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex items-start gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""
                        }`}
                    >
                      <Avatar className={message.role === "user" ? "bg-primary" : "bg-muted"}>
                        <div className="text-xs">{message.role === "user" ? "You" : "AI"}</div>
                      </Avatar>
                      <div
                        className={`rounded-lg px-4 py-2 ${message.role === "user" ? "bg-background text-primary" : "bg-muted"
                          }`}
                      >
                        <Markdown content={message.content} />
                        {/* {message.content} */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 