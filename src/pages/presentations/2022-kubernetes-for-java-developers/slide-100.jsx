import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';
import {ELink} from '../../../components';

const Slide100 = () => (
  <SlideTemplate slide={10} title='Controlling Kubernetes from Java'>
    <ul>
      <li>Kubernetes Client libraries (
        <ELink href='https://kubernetes.io/docs/reference/using-api/client-libraries/'>kubernetes.io</ELink>
        )
        <ul>
          <li>You don't need Go</li>
          <li>YAML sucks</li>
          <li>Fabric8 Kubernetes Client</li>
        </ul>
      </li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide100, '/presentations/2022-kubernetes-for-java-developers/slide-090',
  '/presentations/2022-kubernetes-for-java-developers/slide-110');
