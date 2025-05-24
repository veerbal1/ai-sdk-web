"use client";

import React from "react";
import { useChat } from "@ai-sdk/react";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Separator } from "@/shared/components/ui/separator";
import { User, Atom, FlaskConical } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ChatUIMessage } from "../types";
import { MessageRenderer } from "./MessageRenderer";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { WelcomeScreen } from "./WelcomeScreen";
import { ChatInput } from "./ChatInput";

export const ChemistryChat: React.FC = () => {
  const {
    messages: rawMessages,
    input,
    handleInputChange,
    handleSubmit,
    status,
  } = useChat({
    api: "/api/chemistry-chat",
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

  return (
    <Card className="w-full max-w-4xl mx-auto flex flex-col h-[84vh] shadow-lg">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-green-600 text-white">
              <Atom className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">Chemistry Assistant</CardTitle>
            <p className="text-sm text-muted-foreground">
              AI-powered chemistry tutor specializing in molecular structures
              and diagrams
            </p>
          </div>
          {isLoading && (
            <Badge variant="secondary" className="ml-auto animate-pulse">
              Analyzing...
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
                              : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          )}
                        >
                          {m.role === "user" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <FlaskConical className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>

                      <div
                        className={cn(
                          "flex-1 max-w-[85%] rounded-xl p-4 shadow-sm transition-all group-hover:shadow-md",
                          m.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-white border border-green-200"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={cn("font-semibold text-sm", {
                              "text-white": m.role === "user",
                              "text-green-800 dark:text-green-200":
                                m.role === "assistant",
                            })}
                          >
                            {m.role === "user" ? "You" : "Chemistry AI"}
                          </span>
                          {m.role === "assistant" && (
                            <Badge
                              variant="outline"
                              className="text-xs border-green-300 text-green-700 dark:border-green-600 dark:text-green-300"
                            >
                              Chemistry Expert
                            </Badge>
                          )}
                        </div>

                        <div
                          className={cn("prose-content", {
                            "text-white [&_*]:text-white/80": m.role === "user",
                            "text-green-900 dark:text-green-100":
                              m.role === "assistant",
                          })}
                        >
                          <MessageRenderer message={m} />
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
              <WelcomeScreen />
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="border-t p-6 !pt-0 !pb-0 w-full">
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          status={status}
        />
      </CardFooter>
    </Card>
  );
}; 