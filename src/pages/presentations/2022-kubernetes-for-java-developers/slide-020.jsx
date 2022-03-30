import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';

const Slide020 = () => (
  <SlideTemplate slide={2} title='Agenda'>
    <ul>
      <li>Introduction - Deploying applications into Kubernetes - Challenges</li>
      <li>What is Kubernetes?</li>
      <li>
        Deploying a Java application into Kubernetes
        <ul><li>Eclipse JKube</li></ul>
      </li>
      <li>
        Controlling Kubernetes from Java
        <ul>
          <li>Fabric8 Kubernetes Client</li>
          <li>JBang</li>
        </ul>
      </li>
      <li>Kubernetes controllers and operators in Java</li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide020, '/presentations/2022-kubernetes-for-java-developers/slide-010',
  '/presentations/2022-kubernetes-for-java-developers/slide-030');
