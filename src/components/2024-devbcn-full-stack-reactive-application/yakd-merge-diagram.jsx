import React from 'react';
import yakdMerge from '!raw-loader!./assets/yakd-merge-diagram.svg';

import './styles/yakd-stream-diagram.scss';

export const YakdMergeDiagram = ({
  ...props
}) => (
  <div dangerouslySetInnerHTML={{__html: yakdMerge}} {...props} />
);
