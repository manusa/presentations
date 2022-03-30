import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';
import ControlLoopDiagram from './components/control-loop-diagram';

const Slide120 = () => (
  <SlideTemplate slide={12} title='Controller pattern'>
    <div style={{
      position: 'absolute',
      top: '30px',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ControlLoopDiagram style={{height: '100%'}} />
    </div>
  </SlideTemplate>
);

export default slideControls(Slide120, '/presentations/2022-kubernetes-for-java-developers/slide-110',
  '/presentations/2022-kubernetes-for-java-developers/slide-130');
