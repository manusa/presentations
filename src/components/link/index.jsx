import React from 'react';

export const Link = ({href, children, ...props}) =>
  <a href={href} {...props}>{children}</a>;

export const ELink = ({...props}) => <Link target='_blank' {...props} />;
