import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';

const Slide030 = () => (
  <SlideTemplate slide={3} title='Goals'>
    <ul>
      <li>Have a basic understanding of what Kubernetes is</li>
      <li>Be able to deploy a Java application into Kubernetes</li>
      <li>Be able to perform basic Kubernetes tasks from Java</li>
      <li>Be able to create shareable Kubernetes Java scripts with JBang</li>
      <li>Understand the controller pattern in Kubernetes</li>
      <li>Hava a basic understanding of Kubernetes operators and their advantages</li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide030, '/presentations/2022-kubernetes-for-java-developers/slide-020',
  '/presentations/2022-kubernetes-for-java-developers/slide-040');
