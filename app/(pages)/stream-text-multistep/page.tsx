import React from 'react';
import { StreamTextMultistepInterface } from '@/features/stream-text-multistep/components/StreamTextMultistepInterface'; // Assuming this path

// Basic Server Component structure
export default function StreamTextMultistepPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Stream Text Multi-Step Demo</h1>
      <StreamTextMultistepInterface />
    </div>
  );
}
