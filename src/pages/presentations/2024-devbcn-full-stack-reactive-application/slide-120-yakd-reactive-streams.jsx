import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2024} from '../../../components';

const Slide120 = ({currentStep}) => {
  // TODO:
  //  - What is the problem
  //  - How is the application solving it
  //  - Animations
  //  - Naïve solution
  //    - From official K8s dashboard, imperative approach
  //    - To reactive approach
  return (
    <DevBcn2024.SlideTemplate slide={12} title='YAKD Reactive Streams'>
      <div
        style={{
          position: 'absolute',
          fontSize: '4rem',
        }}
      >
        {currentStep === 1 ? 'Official Kubernetes Dashboard' : 'YAKD'}
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <DevBcn2024.YakdImperativeDiagram
          style={{
            display: currentStep === 1 ? 'block' : 'none',
          }}
        />
        <DevBcn2024.YakdStreamDiagram
          style={{
            display: currentStep >= 2 ? 'block' : 'none',
            maxWidth: '100%',
            transform: `scale(${currentStep === 3 ? 1.8 : 1})`,
            transition: 'transform 1s ease-in-out'
          }}
        />
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide120,
  `/presentations/${DevBcn2024.SLUG}/slide-110-yakd-reactive`,
  `/presentations/${DevBcn2024.SLUG}/slide-130-resilient-backend-quarkus`,
  3);
