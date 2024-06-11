import React from 'react';
import yakdImperativeDiagram from '!raw-loader!./assets/yakd-imperative-diagram.svg';

import './styles/yakd-stream-diagram.scss';

export const YakdImperativeDiagram = ({
  ...props
}) => (
  <div dangerouslySetInnerHTML={{__html: yakdImperativeDiagram}} {...props} />
);
