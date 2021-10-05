import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {railscasts} from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Index = ({
  language,
  style = railscasts,
  showLineNumbers = false,
  children
}) => (
  <SyntaxHighlighter language={language} style={style} showLineNumbers={showLineNumbers}>
    {children.trim()}
  </SyntaxHighlighter>
);

export default Index;
