import { ChatInterface } from '@/features/chat-caching-demo';

export const metadata = {
  title: 'Caching Middleware Demo',
  description: 'Demonstrates local caching middleware for AI SDK requests (Development Only).',
};

/**
 * Page component demonstrating the chat caching feature.
 * Renders the client-side ChatInterface component.
 */
export default function ChatCachingDemoPage() {
  return (
    <section className="container overflow-hidden grid items-center gap-6 pb-8 md:py-10">
      <div>
        <ChatInterface />
      </div>
    </section>
  );
}