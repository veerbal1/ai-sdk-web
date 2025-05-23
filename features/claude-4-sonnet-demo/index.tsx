"use client";

import React from "react";
import { useChat, type Message } from "@ai-sdk/react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Separator } from "@/shared/components/ui/separator";
import { SendHorizontal, Bot, User, Brain } from "lucide-react";
import { Markdown } from "@/shared/components/ui/markdown";
import { cn } from "@/shared/lib/utils";

// Enhanced message part types that are compatible with AI SDK
interface ReasoningDetail {
  type: "text" | string;
  text?: string;
}

interface ReasoningPartForDisplay {
  type: "reasoning";
  reasoning: string; // Changed from 'details' to 'reasoning' to match AI SDK types
  details?: ReasoningDetail[]; // Keep details as optional for backward compatibility
}

interface TextPartForDisplay {
  type: "text";
  text: string;
}

type DisplayPart = TextPartForDisplay | ReasoningPartForDisplay;

// Now extends Message directly without conflicting parts type
interface ChatUIMessage extends Message {
  displayParts?: DisplayPart[]; // Use a different property name to avoid conflicts
}

const Claude4SonnetDemo = () => {
  const {
    messages: rawMessages,
    input,
    handleInputChange,
    handleSubmit,
    status,
  } = useChat({
    api: "/api/claude-4-chat",
  });

  // Cast messages to our enhanced type
  const messages = rawMessages as ChatUIMessage[];

  const isLoading = status === "submitted";

  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const renderMessageParts = (message: ChatUIMessage) => {
    // Check for standard AI SDK parts first
    if (message.parts && message.parts.length > 0) {
      return (
        <div className="space-y-3">
          {message.parts.map((part, index) => (
            <div key={index}>
              {part.type === "text" && part.text.trim() && (
                <Markdown
                  content={part.text}
                  className={cn("prose prose-sm dark:prose-invert max-w-none")}
                />
              )}
              {part.type === "reasoning" && (
                <details className="group">
                  <summary className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors">
                    <Brain className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="secondary" className="text-xs">
                      Reasoning
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      View AI's thought process
                    </span>
                  </summary>
                  <div className="mt-2 p-3 bg-muted/30 rounded-md border">
                    <pre className="text-xs whitespace-pre-wrap break-words text-muted-foreground">
                      {part.reasoning}
                    </pre>
                  </div>
                </details>
              )}
            </div>
          ))}
        </div>
      );
    }

    // Fallback for custom displayParts
    if (message.displayParts && message.displayParts.length > 0) {
      return (
        <div className="space-y-3">
          {message.displayParts.map((part, index) => (
            <div key={index}>
              {part.type === "text" && part.text.trim() && (
                <Markdown
                  content={part.text}
                  className="prose prose-sm dark:prose-invert max-w-none"
                />
              )}
              {part.type === "reasoning" && (
                <details className="group">
                  <summary className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors">
                    <Brain className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="secondary" className="text-xs">
                      Reasoning
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      View AI's thought process
                    </span>
                  </summary>
                  <div className="mt-2 p-3 bg-muted/30 rounded-md border">
                    <pre className="text-xs whitespace-pre-wrap break-words text-muted-foreground">
                      {part.reasoning ||
                        part.details
                          ?.map((detail) =>
                            detail.type === "text" ? detail.text : "<redacted>"
                          )
                          .join("\n")}
                    </pre>
                  </div>
                </details>
              )}
            </div>
          ))}
        </div>
      );
    }

    // Fallback to content
    return message.role === "assistant" ? (
      <Markdown
        content={message.content}
        className="prose prose-sm dark:prose-invert max-w-none"
      />
    ) : (
      <span>{message.content}</span>
    );
  };

  const LoadingSkeleton = () => (
    <div className="flex items-start gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback>
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto flex flex-col h-[84vh] shadow-lg">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">Claude Assistant</CardTitle>
            <p className="text-sm text-muted-foreground">
              Powered by Claude 4 Sonnet with reasoning capabilities
            </p>
          </div>
          {isLoading && (
            <Badge variant="secondary" className="ml-auto animate-pulse">
              Thinking...
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col overflow-hidden py-0">
        <ScrollArea className="flex-grow h-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.length > 0 ? (
              <>
                {messages.map((m: ChatUIMessage, index) => (
                  <div key={m.id} className="group">
                    <div
                      className={cn(
                        "flex items-start gap-3",
                        m.role === "user" && "flex-row-reverse"
                      )}
                    >
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback
                          className={cn(
                            m.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          {m.role === "user" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>

                      <div
                        className={cn(
                          "flex-1 max-w-[85%] rounded-xl p-4 shadow-sm transition-all group-hover:shadow-md",
                          m.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/50 border"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={cn("font-semibold text-sm", {
                              "text-white": m.role === "user",
                            })}
                          >
                            {m.role === "user" ? "You" : "Claude"}
                          </span>
                          {m.role === "assistant" && (
                            <Badge variant="outline" className="text-xs">
                              AI
                            </Badge>
                          )}
                        </div>

                        <div
                          className={cn("prose-content", {
                            "text-white [&_*]:text-white/80": m.role === "user",
                          })}
                        >
                          {renderMessageParts(m)}
                        </div>
                      </div>
                    </div>

                    {index < messages.length - 1 && (
                      <Separator className="my-6 opacity-30" />
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="mt-6">
                    <LoadingSkeleton />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Bot className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Welcome to Claude Assistant
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Start a conversation with Claude 4 Sonnet. Ask questions, get
                  help with coding, or explore ideas. Claude can show you its
                  reasoning process too!
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="border-t p-6 !pt-0 !pb-0 w-full">
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 w-full flex-col"
        >
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              Claude 4 Sonnet
            </Badge>
            <span>•</span>
            <span>Reasoning enabled</span>
          </div>
          <div className="flex-1 relative">
            <Input
              className="pr-12 py-6 text-base rounded-full w-full"
              value={input}
              placeholder="Ask Claude anything..."
              onChange={handleInputChange}
              disabled={isLoading}
              aria-label="Chat input"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
              aria-label="Send message"
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Claude4SonnetDemo;
