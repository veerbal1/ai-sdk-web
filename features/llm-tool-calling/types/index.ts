import { z } from 'zod';

// Base message type
export type Message = {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  createdAt?: Date;
  annotations?: Record<string, unknown>;
  parts?: MessagePart[];
};

// Message parts types
export type TextPart = {
  type: 'text';
  text: string;
};

export type ReasoningPart = {
  type: 'reasoning';
  reasoning: string;
};

export type ToolInvocationPart = {
  type: 'tool-invocation';
  toolInvocation: ToolInvocation;
};

export type SourcePart = {
  type: 'source';
  source: Source;
};

export type StepStartPart = {
  type: 'step-start';
};

// Tool related types
export type ToolInvocation = {
  state: 'partial-call' | 'call' | 'result';
  toolCallId: string;
  toolName: string;
  args: unknown;
  result?: unknown;
};

export type Source = {
  sourceType: 'url';
  id: string;
  url: string;
  title?: string;
};

// Tool definition type
export type ToolDefinition = {
  name: string;
  description: string;
  parameters: z.ZodType<unknown>;
  execute: (params: unknown) => Promise<unknown>;
};

// Chat state type
export type ChatState = {
  messages: Message[];
  isLoading: boolean;
  error: Error | undefined;
  status: 'submitted' | 'streaming' | 'ready' | 'error';
};

// Chat options type
export type ChatOptions = {
  api?: string;
  id?: string;
  initialInput?: string;
  initialMessages?: Message[];
  onToolCall?: (params: { toolCall: ToolInvocation }) => void | unknown | Promise<unknown>;
  onResponse?: (response: Response) => void;
  onFinish?: (message: Message, options: OnFinishOptions) => void;
  onError?: (error: Error) => void;
  maxSteps?: number;
  headers?: Record<string, string> | Headers;
  body?: unknown;
};

export type OnFinishOptions = {
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason: 'stop' | 'length' | 'content-filter' | 'tool-calls' | 'error' | 'other' | 'unknown';
};

export type MessagePart = TextPart | ReasoningPart | ToolInvocationPart | SourcePart | StepStartPart; 