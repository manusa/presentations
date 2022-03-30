import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';
import {ELink, KubernetesLogo, OpenShiftLogo} from '../../../components';

const Slide080 = () => (
  <SlideTemplate slide={8} title='Deploying a Java application into Kubernetes'>
    <ul>
      <li>
        Get a cluster
        <ul>
          <li><KubernetesLogo style={{height: '2rem'}} /> <ELink href='https://minikube.sigs.k8s.io/docs/start//'>
            Minikube</ELink></li>
          <li><OpenShiftLogo style={{height: '2rem'}} hideText={true} /> <ELink
            href='https://developers.redhat.com/developer-sandbox/get-started/'>
            <span style={{color: '#eb2126'}}>OpenShift</span> Developer Sandbox</ELink></li>
          <li><KubernetesLogo style={{height: '2rem'}} /> <ELink href='https://www.okteto.com/'>Okteto</ELink></li>
        </ul>
      </li>
      <li>
        Bootstrap your application
        <ul>
          <li><ELink href='https://start.spring.io/'>Spring (start.spring.io)</ELink></li>
          <li><ELink href='https://code.quarkus.io/'>Quarkus (code.quarkus.io)</ELink></li>
        </ul>
      </li>
      <li>Add Eclipse JKube</li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide080, '/presentations/2022-kubernetes-for-java-developers/slide-070',
  '/presentations/2022-kubernetes-for-java-developers/slide-090');
