import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';

const Slide120 = () => (
  <SlideTemplate slide={13} title='Kubernetes Operators in Java'>
    <ul>
      <li>
        Operators vs. Helm
        <ul>
          <li>Day 2 operations</li>
        </ul>
      </li>
      <li>Java Operator SDK</li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide120, '/presentations/2022-kubernetes-for-java-developers/slide-120',
  '/presentations/2022-kubernetes-for-java-developers/slide-999');
