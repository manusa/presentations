import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';

const Slide020 = () => (
  <SlideTemplate slide={2} title='Agenda'>
    <ul>
      <li>Introduction</li>
      <li>Deploying applications to Kubernetes - Challenges</li>
      <li>What is Eclipse JKube?</li>
      <li>Demo</li>
      <li>Why should I choose Eclipse JKube?</li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide020, '/presentations/eclipse-jkube-2021-devconf-cz/slide-010', '/presentations/eclipse-jkube-2021-devconf-cz/slide-030');
