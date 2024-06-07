import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2024, kubernetesComponentsDiagram} from '../../../components';

const Slide120 = ({currentStep}) => {
  return (
    <DevBcn2024.SlideTemplate slide={12} title='YAKD Backend'>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <img
          style={{
            maxWidth: '100%',
            transform: `scale(${currentStep === 2 ? 2 : 1})`,
            transition: 'transform 1s ease-in-out'
          }}
          src={DevBcn2024.yakdArchitecture}
          alt='A diagram of the YAKD architecture for streaming'
        />
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide120,
  `/presentations/${DevBcn2024.SLUG}/slide-110-yakd-reactive`,
  `/presentations/${DevBcn2024.SLUG}/slide-130-resilient-backend-quarkus`,
  2);
