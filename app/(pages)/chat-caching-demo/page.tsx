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
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Chat Caching Demo
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Interact with the AI. Responses will be cached locally in{' '}
          <code>.cache/ai-cache.json</code>. Clear this file for fresh responses.
          <strong className="block mt-2">Note:</strong> This caching is for development/testing only.
        </p>
      </div>
      <div className="mt-4">
        <ChatInterface />
      </div>
    </section>
  );
}