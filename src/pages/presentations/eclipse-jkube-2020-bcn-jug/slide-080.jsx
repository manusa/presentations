import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';
import demoOverview from './assets/demo-overview.png';

import './styles/slide-demo-overview.scss';

const Slide080 = () => (
  <SlideTemplate slide={8} title="Demo Time!">
    <div className='diagram'>
      <a className='diagram__link' href='https://github.com/marcnuri-demo/jkube-kafka' target='_blank'>
        <img className='diagram__image' src={demoOverview} />
      </a>
    </div>
  </SlideTemplate>
);

export default slideControls(Slide080, '/presentations/eclipse-jkube-2020-bcn-jug/slide-070', '/presentations/eclipse-jkube-2020-bcn-jug/slide-090');
