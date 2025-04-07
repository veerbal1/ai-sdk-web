'use client';

import React from 'react';
import { useChat, type Message } from '@ai-sdk/react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { SendHorizontal } from 'lucide-react';
import { Markdown } from '@/shared/components/ui/markdown';
import { type ToolInvocation } from '../types';
import { cn } from '@/shared/lib/utils';

export const ToolCallingChat = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, status } = useChat({
    api: '/api/llm-tool-calling',
    maxSteps: 2,
  });

  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const renderToolInvocation = (toolInvocation: ToolInvocation) => {
    switch (toolInvocation.state) {
      case 'partial-call':
        return (
          <div className="text-sm text-muted-foreground animate-pulse">
            Preparing to use {toolInvocation.toolName}...
          </div>
        );
      case 'call':
        return (
          <div className="text-sm text-muted-foreground">
            Using {toolInvocation.toolName}...
          </div>
        );
      case 'result':
        return (
          <div className="text-sm">
            <span className="font-medium text-accent-foreground">{toolInvocation.toolName} result:</span>
            <pre className="mt-1 p-2 bg-secondary/50 rounded-md overflow-x-auto text-secondary-foreground">
              {JSON.stringify(toolInvocation.result, null, 2)}
            </pre>
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto flex flex-col h-[80vh] bg-card text-card-foreground border-0 shadow-none">
      <CardContent className="flex-grow flex flex-col overflow-hidden p-0">
        <ScrollArea className="flex-grow h-[calc(80vh-8rem)]" ref={scrollAreaRef}>
          <div className="p-6 space-y-6">
            {messages.length > 0 ? (
              messages.map((m: Message) => (
                <div 
                  key={m.id} 
                  className={cn(
                    "flex flex-col group",
                    m.role === 'user' ? 'items-end' : 'items-start'
                  )}
                >
                  <div className={cn(
                    "px-4 py-3 rounded-lg max-w-3xl transition-all duration-200",
                    m.role === 'user' 
                      ? 'bg-primary/5 text-primary-foreground self-end hover:bg-primary/10'
                      : 'bg-muted/50 text-muted-foreground self-start hover:bg-muted/70'
                  )}>
                    <span className="font-medium text-xs uppercase tracking-wider text-muted-foreground/70 mb-1 block">
                      {m.role}
                    </span>
                    {m.parts?.map((part, index) => {
                      switch (part.type) {
                        case 'text':
                          return (
                            <div key={index} className="prose prose-sm dark:prose-invert max-w-3xl">
                              <Markdown content={part.text} />
                            </div>
                          );
                        case 'tool-invocation':
                          return (
                            <div key={index} className="my-2">
                              {renderToolInvocation(part.toolInvocation)}
                            </div>
                          );
                        case 'reasoning':
                          return (
                            <div key={index} className="text-sm italic text-muted-foreground/70 my-1">
                              {part.reasoning}
                            </div>
                          );
                        default:
                          return null;
                      }
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-light tracking-tight">Welcome (Tool Calling Demo)</h2>
                  <p className="text-muted-foreground/70">Ask me anything about Veerbal's professional journey and expertise.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/30 rounded-lg border border-border/40 hover:border-border/60 transition-colors">
                    <h3 className="font-medium text-accent-foreground mb-3">Professional Information</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground/70">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        Work Experience
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        Technical Skills
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        Education
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        Languages
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg border border-border/40 hover:border-border/60 transition-colors">
                    <h3 className="font-medium text-accent-foreground mb-3">Projects & Achievements</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground/70">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        Recent Projects
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        Professional Overview
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        Personal Statement
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="p-6 border-t border-border/40">
          <div className="flex items-center gap-2">
            <Input
              className="flex-grow bg-background border-border/40 focus:border-primary/50"
              value={input}
              placeholder="Ask about Veerbal's experience, skills, projects, or education..."
              onChange={handleInputChange}
              disabled={isLoading || status === 'streaming'}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim() || status === 'streaming'}
              className="bg-primary/5 text-primary hover:bg-primary/10 border border-primary/20"
              size="icon"
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}; 