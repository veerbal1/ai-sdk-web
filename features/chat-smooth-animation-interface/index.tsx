"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Markdown } from "@/shared/components/ui/markdown";
import { useChat } from "@ai-sdk/react";
import { IconLoader, IconSend } from "@tabler/icons-react";
import { Loader } from "lucide-react";

const ChatSmoothAnimationInterface = () => {
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: "/api/chat-smooth-animation",
  });

  const isSubmitted = status === "submitted";
  const isStreaming = status === "streaming";

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="group">
              {message.role === "user" ? (
                <div className="flex justify-end">
                  <div className="max-w-[80%]">
                    <div className="text-xs text-muted-foreground mb-1 text-right">
                      You
                    </div>
                    <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm">
                      {message.content}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="max-w-[80%]">
                    <div className="text-xs text-muted-foreground mb-1">
                      Assistant
                    </div>
                    <div className="bg-muted px-3 py-2 rounded-lg text-sm">
                      <Markdown content={message.content} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {isSubmitted && (
            <div className="flex justify-start w-fit">
              <div className="max-w-[80%]">
                <div className="text-xs text-muted-foreground mb-1">
                  Assistant
                </div>
                <div className="bg-muted p-2 rounded-lg text-sm flex items-center gap-2 justify-center">
                  <Loader className="h-4 w-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Bar */}
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-3xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              className="flex-1 text-sm"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              disabled={isSubmitted}
            />
            <Button
              size="sm"
              type="submit"
              disabled={!input.trim() || isSubmitted || isStreaming}
            >
              {isStreaming ? (
                <IconLoader className="h-4 w-4 animate-spin" />
              ) : (
                <IconSend className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatSmoothAnimationInterface;
