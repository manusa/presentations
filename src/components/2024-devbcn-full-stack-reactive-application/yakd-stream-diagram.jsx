import React from 'react';
import yakdStream from '!raw-loader!./assets/yakd-stream.svg';

export const YakdStreamDiagram = ({
  ...props
}) => (
  <div dangerouslySetInnerHTML={{__html: yakdStream}} {...props} />
);
