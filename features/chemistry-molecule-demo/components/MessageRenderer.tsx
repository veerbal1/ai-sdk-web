import React from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Brain } from "lucide-react";
import { Markdown } from "@/shared/components/ui/markdown";
import { cn } from "@/shared/lib/utils";
import { ChatUIMessage } from "../types";
import { ToolInvocationDisplay } from "./ToolInvocationDisplay";

interface MessageRendererProps {
  message: ChatUIMessage;
}

export const MessageRenderer: React.FC<MessageRendererProps> = ({ message }) => {
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
                    Chemical Reasoning
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    View AI's chemical analysis process
                  </span>
                </summary>
                <div className="mt-2 p-3 bg-muted/30 rounded-md border">
                  <pre className="text-xs whitespace-pre-wrap break-words text-muted-foreground">
                    {part.reasoning}
                  </pre>
                </div>
              </details>
            )}
            {part.type === "tool-invocation" && part.toolInvocation && (
              <ToolInvocationDisplay toolInvocation={part.toolInvocation} />
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
                    Chemical Reasoning
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    View AI's chemical analysis process
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