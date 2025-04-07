'use client';

import { useChat } from '@ai-sdk/react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { useRef } from 'react';
import { Markdown } from '@/shared/components/ui/markdown';

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
    <div className="flex flex-col h-[calc(100vh-150px)] max-h-[700px] w-full max-w-2xl mx-auto">
      <ScrollArea className="flex-grow p-4 border rounded-md mb-4 h-36" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4 pr-2"> {/* Added slight padding-right for scrollbar */}
          {messages.length === 0 && (
            <p className="text-center text-muted-foreground">
              No messages yet. Start the conversation!
            </p>
          )}
          {messages.map(m => (
            <div
              key={m.id}
              className={`p-3 rounded-lg shadow-sm w-fit max-w-[85%] ${m.role === 'user'
                ? 'bg-primary/10 self-end'
                : 'bg-muted self-start'
                }`}
            >
              <span className="font-semibold capitalize mr-2">
                {m.role === 'user' ? 'You' : 'AI'}:
              </span>
              {/* Use break-words to prevent overflow with long words */}
              {/* <Markdown content={m.content} /> */}
              <span className="whitespace-pre-wrap break-words">{m.content}</span>
            </div>
          ))}
          {/* Empty div at the end to scroll to */}
          <div ref={messagesEndRef} />
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