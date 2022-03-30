import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';
import {ELink, KubernetesLogo, OpenShiftLogo} from '../../../components';
import dukeKubernetesSurf from './assets/duke-kubernetes-surf-sc.png';

const Slide070 = () => (
  <SlideTemplate slide={7} title='Deploying a Java application into Kubernetes'>
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
      <li>Add Eclipse JKube <br />
        <img style={{marginTop: '1rem', marginLeft: '1rem', height: '6rem'}} src={dukeKubernetesSurf} />
      </li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide070, '/presentations/2022-kubernetes-for-java-developers/slide-060',
  '/presentations/2022-kubernetes-for-java-developers/slide-080');
