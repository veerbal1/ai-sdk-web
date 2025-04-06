import React from 'react';
import { StreamObjectInterface } from '@/features/stream-object-demo/components/StreamObjectInterface';

export default function StreamObjectPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Stream Object Demo</h1>
      <StreamObjectInterface />
    </div>
  );
}
