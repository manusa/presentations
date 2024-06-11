import React from 'react';
import selfHealing from '!raw-loader!./assets/self-healing.svg';

export const SelfHealingIcon = ({
  ...props
}) => (
  <div dangerouslySetInnerHTML={{__html: selfHealing}} {...props} />
);
