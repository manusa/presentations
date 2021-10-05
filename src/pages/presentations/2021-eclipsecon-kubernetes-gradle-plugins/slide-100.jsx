import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';
import uncleSam from './assets/uncle-sam.png';

import './styles/slide-roadmap.scss';

const Slide100 = () => (
  <SlideTemplate slide={10} title="What's coming - Roadmap">
    <div className='roadmap'>
      <div className='roadmap__entries'>
        <ul>
          <li>Gradle Plugins full support</li>
          <li>Helm Chart generation improvements</li>
          <li>Additional build strategies</li>
          <li>Support for more frameworks</li>
          <li>Get involved to decide!</li>
        </ul>
      </div>
      <img className='roadmap__image' src={uncleSam} alt='We want you!' />
    </div>
  </SlideTemplate>
);

export default slideControls(Slide100, '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-090', '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-110');
