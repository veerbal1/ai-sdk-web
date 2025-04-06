'use client';

import React from 'react';
import { marked } from 'marked';

interface MarkdownProps {
  content: string;
  className?: string;
}

const MarkdownComponent = ({ content, className = '' }: MarkdownProps) => {
  return (
    <div 
      className={`prose dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: marked(content) }}
    />
  );
};

export const Markdown = React.memo(MarkdownComponent); 