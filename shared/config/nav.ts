import { IconFileAi, type Icon } from '@tabler/icons-react'; // Import Icon type

export interface NavItem {
  title: string;
  url: string;
  icon: Icon; // Use the specific Icon type from Tabler
  disabled?: boolean;
  external?: boolean;
}

export const mainNavItems: NavItem[] = [
  {
    title: "Web Search Agent",
    url: "/web-search-agent",
    icon: IconFileAi,
  },
  {
    title: 'Generate Text',
    url: '/generate-text',
    icon: IconFileAi,
  },
  {
    title: 'Image Generation (Chat)',
    url: '/generate-image-chat',
    icon: IconFileAi,
  },
  {
    title: 'Stream Object Demo',
    url: '/stream-object-demo',
    icon: IconFileAi,
  },
  {
    title: 'LLM Tool Calling',
    url: '/llm-tool-calling',
    icon: IconFileAi,
  },
  {
    title: 'Groq Chat (llama-4-scout)',
    url: '/groq-chat',
    icon: IconFileAi,
  },
  // {
  //   title: 'Stream Text Multi-Step',
  //   url: '/stream-text-multistep',
  //   icon: IconFileAi,
  // }
]; 