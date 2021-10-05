import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';

const Slide020 = () => (
  <SlideTemplate slide={2} title='Agenda'>
    <ul>
      <li>Introduction - Deploying applications to Kubernetes - Challenges</li>
      <li>What is Eclipse JKube?</li>
      <ul>
        <li>Components</li>
        <li>Configuration modes</li>
      </ul>
      <li>
        <span style={{color: '#326ce5'}}>Kubernetes</span>
        <span style={{opacity: 0.5}}>|</span>
        <span style={{color: '#eb2126'}}>OpenShift</span>&nbsp;
        Gradle Plugin</li>
      <li>Demo</li>
      <li>Why should I choose Eclipse JKube?</li>
      <li>Roadmap</li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide020, '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-010', '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-030');
