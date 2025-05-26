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
      className={`prose prose-p:w-full prose-sm dark:prose-invert w-full overflow-hidden`}
      dangerouslySetInnerHTML={{ __html: marked(content) }}
    />
  );
};

export const Markdown = React.memo(MarkdownComponent); 