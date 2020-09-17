import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';

const Slide2 = () => (
  <SlideTemplate slide={2} title='Agenda'>
    <ul>
      <li>Cloud Native / Kubernetes</li>
      <li>What is Eclipse JKube?</li>
      <li>
        Demo
        <ul>
          <li>From zero to cloud with Maven and Eclipse JKube</li>
          <li>Old school Java Web application ready for the cloud</li>
        </ul>
      </li>
      <li>Future developments</li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide2, '/presentations/eclipse-jkube-introduction/slide1', '/presentations/eclipse-jkube-introduction/slide3');
