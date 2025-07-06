import React from 'react';
import yakdArchitectureSimplified from '!raw-loader!./assets/mcp-sequence-diagram.svg';

//Remember to remove width and height attributes from the SVG file
export const McpSequenceDiagram = ({
  ...props
}) => (
  <div dangerouslySetInnerHTML={{__html: yakdArchitectureSimplified}} {...props} />
);
