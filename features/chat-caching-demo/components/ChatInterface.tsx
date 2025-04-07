'use client';

import { useChat } from '@ai-sdk/react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { ScrollArea } from '@/shared/components/ui/scroll-area';

/**
 * Renders a basic chat interface using the useChat hook.
 */
export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      // The API endpoint created earlier is used by default
    });

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-h-[700px] w-full max-w-2xl mx-auto stretch">
      <ScrollArea className="flex-grow p-4 border rounded-md mb-4">
        <div className="flex flex-col gap-4">
          {messages.length === 0 && (
            <p className="text-center text-muted-foreground">
              No messages yet. Start the conversation!
            </p>
          )}
          {messages.map(m => (
            <div
              key={m.id}
              className={`p-3 rounded-lg shadow-sm ${m.role === 'user' ? 'bg-primary/10 self-end' : 'bg-muted self-start'}`}
            >
              <span className="font-semibold capitalize mr-2">
                {m.role === 'user' ? 'You' : 'AI'}:
              </span>
              <span className="whitespace-pre-wrap">{m.content}</span>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </div>
  );
} 