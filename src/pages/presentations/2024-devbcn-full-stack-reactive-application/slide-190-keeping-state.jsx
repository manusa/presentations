import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2024, KubernetesLogo} from '../../../components';

const Slide190 = ({currentStep}) => {
  return (
    <DevBcn2024.SlideTemplate slide={19} title='Frontend: Keeping the state'>
      <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <img
          style={{
            display: currentStep <= 2 ? 'block' : 'none',
            maxWidth: '100%',
            transform: `scale(${currentStep === 2 ? 2.5 : 1}) translateX(${currentStep === 2 ? '470' : '0'}px)`,
            transition: 'transform 1s ease-in-out'
          }}
          src={DevBcn2024.yakdArchitecture}
          alt='A diagram of the YAKD architecture for streaming'
        />
        <div
          style={{
            display: currentStep === 3 ? 'block' : 'none',
            marginLeft: '-1rem' // Otherwise looks like it's not centered in relation to the Sagrada Familia
          }}
        >
          <KubernetesLogo style={{
            marginLeft: '31rem',
            width: '30rem',
            '-webkit-box-reflect': 'left 1rem linear-gradient(to left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8))'
          }}/>
          <div style={{display: 'flex', textAlign: 'center'}}>
            <div style={{flex: '1 1 0'}}>Redux State</div>
            <div style={{flex: '1 1 0'}}>Kubernetes Cluster</div>
          </div>
        </div>
        <img
          style={{
            display: currentStep === 4 ? 'block' : 'none',
            maxWidth: '100%',
          }}
          src={DevBcn2024.yakdState}
          alt='A snapshot of the YAKD frontend state'
        />
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide190,
  `/presentations/${DevBcn2024.SLUG}/slide-180-yakd-frontend`,
  `/presentations/${DevBcn2024.SLUG}/slide-200-consuming-sse`,
  4);
