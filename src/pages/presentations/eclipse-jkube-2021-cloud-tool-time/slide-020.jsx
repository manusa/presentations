import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';

const Slide020 = () => (
  <SlideTemplate slide={2} title='Agenda'>
    <ul>
      <li>What is Eclipse JKube?</li>
      <li>Demo
        <ul>
          <li>Bootstrap Quarkus from code.quarkus.io</li>
          <li>Deploy into Minikube</li>
          <li>Deploy into OpenShift</li>
        </ul>
      </li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide020, '/presentations/eclipse-jkube-2021-cloud-tool-time/slide-010', '/presentations/eclipse-jkube-2021-cloud-tool-time/slide-030');
