import React from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Brain } from "lucide-react";
import { Markdown } from "@/shared/components/ui/markdown";
import { cn } from "@/shared/lib/utils";
import { ChatUIMessage } from "../types";
import { ToolInvocationDisplay } from "./ToolInvocationDisplay";
import ReasoningViewer from "@/features/reasoning-viewer";

interface MessageRendererProps {
  message: ChatUIMessage;
}

export const MessageRenderer: React.FC<MessageRendererProps> = ({
  message,
}) => {
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
              <ReasoningViewer content={part.reasoning} />
            )}
            {part.type === "tool-invocation" && part.toolInvocation && (
              <ToolInvocationDisplay toolInvocation={part.toolInvocation} />
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
