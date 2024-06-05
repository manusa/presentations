import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2024, kubernetesComponentsDiagram} from '../../../components';

const Img = ({src, visible = false}) => (
  <img
    style={{
      position: 'absolute',
      maxWidth: '100%',
      top: '50%',
      left: visible ? '50%' : '150%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 0 1.5rem 0rem #333333BB',
      transition: 'left 0.5s ease-in-out 0s'
    }}
    src={src}
    alt='screenshot'
  />
);

const Slide110 = ({currentStep}) => {
  const visibleFrom = step => currentStep >= step;
  return (
    <DevBcn2024.SlideTemplate slide={11} title='YAKD Reactive'>
      <div style={{position: 'relative', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontFamily: '\'Lionello\', sans-serif', fontSize: '10rem', textShadow: '0rem -2rem 0.9rem #FFFFFF66'}}>
          You said Reactive
        </div>
        <Img src={DevBcn2024.kubernetesDashboardSearch} visible={visibleFrom(2)} />
        <Img src={DevBcn2024.kubernetesDashboardPolling} visible={visibleFrom(3)} />
        <Img src={DevBcn2024.yakdSearch} visible={visibleFrom(4)} />
        <Img src={DevBcn2024.yakdStreaming} visible={visibleFrom(5)} />
      </div>
    </DevBcn2024.SlideTemplate>
);
};

export default slideControls(Slide110,
`/presentations/${DevBcn2024.SLUG}/slide-100-yakd-architecture`,
  `/presentations/${DevBcn2024.SLUG}/slide-120-yakd-backend`,
  5);
