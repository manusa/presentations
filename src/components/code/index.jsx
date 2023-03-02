import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {railscasts} from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const Code = ({
  className,
  language,
  lineProps,
  lineNumberStyle,
  style = railscasts,
  showLineNumbers = false,
  children
}) => {
  let wrapLines = false;
  if (lineProps) {
    wrapLines = true;
    if (!showLineNumbers) {
      showLineNumbers = true;
      lineNumberStyle = {display: 'none'};
    }
  }
  return (
    <SyntaxHighlighter
      className={className} style={style} language={language}
      showLineNumbers={showLineNumbers} wrapLines={wrapLines}
      lineProps={lineProps} lineNumberStyle={lineNumberStyle}
    >
      {children.trim()}
    </SyntaxHighlighter>
  );
};