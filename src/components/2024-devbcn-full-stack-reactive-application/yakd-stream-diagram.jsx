import React from 'react';
import yakdStream from '!raw-loader!./assets/yakd-stream.svg';

import './styles/yakd-stream-diagram.scss';

export const YakdStreamDiagram = ({
  ...props
}) => (
  <div dangerouslySetInnerHTML={{__html: yakdStream}} {...props} />
);
