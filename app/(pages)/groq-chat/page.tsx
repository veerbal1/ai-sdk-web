import React from 'react';
import { GroqChatInterface } from '@/features/groq-chat/components/GroqChatInterface';

export default function GroqChatPage() {
  return (
    <div className="container mx-auto py-8">
      {/* No main heading needed as the Card has a title */}
      <GroqChatInterface />
    </div>
  );
}
