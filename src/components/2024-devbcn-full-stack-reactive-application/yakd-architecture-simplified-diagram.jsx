import React from 'react';
import yakdStream from '!raw-loader!./assets/yakd-architecture-simplified.svg';

import './styles/yakd-stream-diagram.scss';

export const YakdArchitectureSimplifiedDiagram = ({
  ...props
}) => (
  <div dangerouslySetInnerHTML={{__html: yakdStream}} {...props} />
);
