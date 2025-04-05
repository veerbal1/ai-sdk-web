import { ImageChatInterface } from '@/features/image-generation-chat/components/ImageChatInterface';
import React from 'react';

// Placeholder Page Component
const GenerateImageChatPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Generate Image with Chat</h1>
      <ImageChatInterface />
    </div>
  );
};

export default GenerateImageChatPage; 