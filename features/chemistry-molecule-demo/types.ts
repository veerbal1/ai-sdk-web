import { type Message } from "@ai-sdk/react";

// Enhanced message part types that are compatible with AI SDK
export interface ReasoningDetail {
  type: "text" | string;
  text?: string;
}

export interface ReasoningPartForDisplay {
  type: "reasoning";
  reasoning: string; // Changed from 'details' to 'reasoning' to match AI SDK types
  details?: ReasoningDetail[]; // Keep details as optional for backward compatibility
}

export interface TextPartForDisplay {
  type: "text";
  text: string;
}

export type DisplayPart = TextPartForDisplay | ReasoningPartForDisplay;

// Now extends Message directly without conflicting parts type
export interface ChatUIMessage extends Message {
  displayParts?: DisplayPart[]; // Use a different property name to avoid conflicts
} 