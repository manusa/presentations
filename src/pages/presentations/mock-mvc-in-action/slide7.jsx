import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import './slide7.scss';

const Slide7 = () => (
  <div className={'slide slide7'}>
    <div className={'reactor-wrapper'}>
      <div className={'title'}>Let's get Reactive</div>
      <div className={'project-reactor'}></div>
    </div>
  </div>
);

export default slideControls(Slide7, '/presentations/mock-mvc-in-action/slide6', '/presentations/mock-mvc-in-action/slide-q-and-a');
