import { IconFileAi, IconMessageChatbot, type Icon } from "@tabler/icons-react"; // Import Icon type

export interface NavItem {
  title: string;
  url: string;
  icon: Icon; // Use the specific Icon type from Tabler
  disabled?: boolean;
  external?: boolean;
  dateCreated?: string;
}

export const mainNavItems: NavItem[] = [
  {
    title: "Chat Caching (Dev)",
    url: "/chat-caching-demo",
    icon: IconMessageChatbot,
    dateCreated: "2025-04-12",
  },
  {
    title: "Web Search Agent",
    url: "/web-search-agent",
    icon: IconFileAi,
    dateCreated: "2025-04-12",
  },
  {
    title: "Generate Text",
    url: "/generate-text",
    icon: IconFileAi,
    dateCreated: "2025-04-12",
  },
  {
    title: "Image Generation (Chat)",
    url: "/generate-image-chat",
    icon: IconFileAi,
    dateCreated: "2025-04-12",
  },
  {
    title: "Stream Object Demo",
    url: "/stream-object-demo",
    icon: IconFileAi,
    dateCreated: "2025-04-12",
  },
  {
    title: "LLM Tool Calling",
    url: "/llm-tool-calling",
    icon: IconFileAi,
    dateCreated: "2025-04-12",
  },
  {
    title: "Groq Chat (llama-4-scout)",
    url: "/groq-chat",
    icon: IconFileAi,
    dateCreated: "2025-04-12",
  },
  {
    title: "Tweet Mimic",
    url: "/tweet-mimic",
    icon: IconFileAi,
    dateCreated: "2025-04-19",
  },
  {
    title: "Dynamic Tool Calling",
    url: "/dynamic-tool-calling",
    icon: IconFileAi,
    dateCreated: "2025-04-28",
  },
  {
    title: "Claude 4 Sonnet",
    url: "/claude-4-sonnet",
    icon: IconFileAi,
    dateCreated: "2025-05-23",
  },
  {
    title: "Reasoning Animation",
    url: "/reasoning-animation",
    icon: IconFileAi,
    dateCreated: "2025-05-24",
  },
  {
    title: "Chemistry Molecule Diagram",
    url: "/chemistry-molecule-diagram",
    icon: IconFileAi,
    dateCreated: "2025-05-24",
  },
  {
    title: "Chat Smooth Animation",
    url: "/chat-smooth-animation",
    icon: IconFileAi,
    dateCreated: "2025-05-26",
  },
];
