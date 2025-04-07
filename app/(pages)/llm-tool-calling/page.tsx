import { ToolCallingChat } from '@/features/llm-tool-calling/components/ToolCallingChat';

export default function LLMToolCallingPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <ToolCallingChat />
      </div>
    </div>
  );
} 