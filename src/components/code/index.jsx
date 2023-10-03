import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {railscasts} from 'react-syntax-highlighter/dist/esm/styles/hljs';

const removeEmptyTopBottomLines = str => {
  const lines = [];
  const rawLines = str.split(/\r?\n/);
  for (let it = 0; it < rawLines.length; it++) {
    const rawLine = rawLines[it];
    if (rawLine.trim().length === 0 && (it === 0 || it === rawLines.length -1)) {
      continue;
    }
    lines.push(rawLine);
  }
  return lines.join('\n');
};

const calculateSuperfluousIndentation = codeSnippet => {
  let superfluousIndentation= Number.MAX_VALUE;
  for (const rawLine of codeSnippet.split(/\r?\n/)) {
    let currentIndent = 0;
    for (const char of rawLine) {
      if (char === ' ') {
        currentIndent++;
      } else {
        break;
      }
    }
    if (currentIndent < superfluousIndentation) {
      superfluousIndentation = currentIndent;
    }
  }
  return superfluousIndentation;
};

export const Code = ({
  className,
  language,
  lineProps,
  lineNumberStyle,
  customStyle,
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
  const codeSnippet = removeEmptyTopBottomLines(children);
  const superfluousIndentation = calculateSuperfluousIndentation(codeSnippet);
  const unindentedSnippet = codeSnippet.split(/\r?\n/)
    .map(line => line.substring(superfluousIndentation))
    .join('\n');
  return (
    <SyntaxHighlighter
      className={className} style={style} language={language} customStyle={customStyle}
      showLineNumbers={showLineNumbers} wrapLines={wrapLines}
      lineProps={lineProps} lineNumberStyle={lineNumberStyle}
    >
      {unindentedSnippet}
    </SyntaxHighlighter>
  );
};
