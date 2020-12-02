import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';
import uncleSam from './assets/uncle-sam.png';

import './styles/slide-roadmap.scss';

const Slide120 = () => (
  <SlideTemplate slide={12} title="What's coming - Roadmap" className='eclipse-jkube-2020-bcn-jug-roadmap'>
    <div className='roadmap'>
      <div className='roadmap__entries'>
        <ul>
          <li>Gradle Plugins</li>
          <li>
            Support for more frameworks and technologies
            <ul><li>Knative</li><li>Istio</li></ul>
          </li>
          <li>
            Improved image generation
            <ul><li>Multilayer support</li><li>Better Podman/Buildah UX</li></ul>
          </li>
          <li>
            Additional build strategies
            <ul><li>Kaniko...</li></ul>
          </li>
          <li>Get involved to decide!</li>
        </ul>
      </div>
      <img className='roadmap__image' src={uncleSam} alt='We want you!' />
    </div>
  </SlideTemplate>
);

export default slideControls(Slide120, '/presentations/eclipse-jkube-2020-bcn-jug/slide-110', '/presentations/eclipse-jkube-2020-bcn-jug/slide-130');
