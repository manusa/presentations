import React from 'react';
import fabric8Icon from '!raw-loader!./assets/fabric8-icon.svg';

export const Fabric8Icon = ({
  ...props
}) => (
  <div dangerouslySetInnerHTML={{__html: fabric8Icon}} {...props} />
);
