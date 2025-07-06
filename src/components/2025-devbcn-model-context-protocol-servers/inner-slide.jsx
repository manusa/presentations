import React from 'react';

export const InnerSlide = ({currentStep, style = {}, children}) => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%',
      position: 'relative', top: (200 - (currentStep * 100)) + '%', transition: 'all 0.5s ease-in-out',
      ...style
    }}>
      {children}
    </div>
  );
};
