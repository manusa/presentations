import React from 'react';
import yakdArchitectureSimplified from '!raw-loader!./assets/yakd-architecture-simplified.svg';

export const YakdArchitectureSimplifiedDiagram = ({
  ...props
}) => (
  <div dangerouslySetInnerHTML={{__html: yakdArchitectureSimplified}} {...props} />
);
