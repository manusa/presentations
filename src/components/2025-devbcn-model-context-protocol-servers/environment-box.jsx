import React from 'react';
import {ORANGE} from './';

export const EnvironmentBox = ({position = 'top', environment, style = {}, children}) => {
  let padding = '3rem 2rem 2rem 2rem';
  let top = '1rem';
  let bottom = 'auto';
  if (position === 'bottom') {
    padding = '2rem 2rem 3rem 2rem';
    top = 'auto';
    bottom = '1rem';
  }
  return (
    <div style={{position: 'relative', borderRadius: '2rem', padding, border: '2px dashed white', ...style}}>
      <div style={{position: 'absolute', top, bottom, left: 0, right: 0, fontSize: '1.5rem', textAlign: 'center', color: ORANGE}}>
        {environment}
      </div>
      {children}
    </div>
  );
};
