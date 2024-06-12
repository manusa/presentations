import React from 'react';
import mutinyIcon from '!raw-loader!./assets/mutiny-icon.svg';

export const MutinyIcon = ({
  ...props
}) => (
  <div dangerouslySetInnerHTML={{__html: mutinyIcon}} {...props} />
);
