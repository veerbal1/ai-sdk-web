/**
 * Represents the structure of a Tweet object.
 */
export interface Tweet {
  id: number | string; // Allow string IDs for potential database use
  name: string;
  handle: string;
  avatarUrl: string;
  content: string;
  // Optional properties can be added later, e.g.:
  // timestamp?: Date;
  // likes?: number;
  // retweets?: number;
} 

/**
 * Represents a source returned by the AI SDK web search tool.
 */
export interface Source {
  id: string;
  sourceType: string; // e.g., "web"
  title: string;
  url: string;
} 