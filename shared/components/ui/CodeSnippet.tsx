import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Choose a style. Example: atomDark. More styles available:
// https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/src/styles/prism/index.js
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeSnippetProps {
  code: string;
  language?: string;
}

// Updated component using react-syntax-highlighter
export const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language = 'tsx' }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={atomDark} // Apply the chosen style
      customStyle={{ margin: 0, padding: '1rem', borderRadius: '0.375rem' }} // Match Tailwind's rounded-md and p-4
      // wrapLines={true} // Optional: wrap long lines
      // showLineNumbers={true} // Optional: show line numbers
    >
      {code}
    </SyntaxHighlighter>
  );
}; 