import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2024} from '../../../components';

const Slide030 = () => {
  return (
    <DevBcn2024.SlideTemplate slide={3} title='What is a Reactive Application?'>
      <DevBcn2024.ReactiveSystemsDiagram />
      <div style={{position: 'fixed', left: '1rem', bottom: '1rem', fontSize: '1rem', fontStyle: 'italic'}}>
        The Reactive Manifesto (https://www.reactivemanifesto.org/)
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide030,
  `/presentations/${DevBcn2024.SLUG}/slide-020`,
  `/presentations/${DevBcn2024.SLUG}/slide-040`);
