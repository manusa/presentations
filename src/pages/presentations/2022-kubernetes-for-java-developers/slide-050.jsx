import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls, {
  visibleClassNameInStep, visibleClassNameUntilStep
} from '../../../components/slide-controls/slide-controls';
import deployment from './assets/kubernetes/deploy-256.png';
import ingress from './assets/kubernetes/ing-256.png';
import pod from './assets/kubernetes/pod-256.png';
import service from './assets/kubernetes/svc-256.png';
import componentsOfKubernetes from './assets/components-of-kubernetes.svg';

import './styles/slide-kubernetes.scss';
import {DockerLogo} from '../../../components';

const Slide050 = ({currentStep}) => {
  const classNameVisibleIn = visibleClassNameInStep(currentStep);
  const classNameVisibleUntil = visibleClassNameUntilStep(currentStep);
  return (
    <SlideTemplate slide={5} title='What is Kubernetes?'>
      <div className='what-is-kubernetes'>
        <div className={`${classNameVisibleUntil(2)} quote`}>
          <blockquote>
            <p>
              Kubernetes is a portable, extensible, <strong>open-source</strong> platform for managing containerized
              workloads and services, that facilitates both declarative configuration and automation
            </p>
            <cite>Kubernetes.io</cite>
          </blockquote>
        </div>
        <div className='component-diagram'>
          <img
            className={classNameVisibleIn(2)}
            src={componentsOfKubernetes} alt='A diagram of the Kubernetes components' />
        </div>
        <div className={classNameVisibleIn(3)}>
          <table>
            <tbody>
              <tr>
                <td><DockerLogo className='k8s-icon' /></td>
                <td>Container</td>
              </tr>
              <tr>
                <td><img className='k8s-icon' src={pod} /></td>
                <td>Pod</td>
              </tr>
              <tr>
                <td><img className='k8s-icon' src={deployment} /></td>
                <td>Deployment</td>
              </tr>
              <tr>
                <td><img className='k8s-icon' src={service} /></td>
                <td>Service</td>
              </tr>
              <tr>
                <td><img className='k8s-icon' src={ingress} /></td>
                <td>Ingress</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SlideTemplate>
  );
};

export default slideControls(Slide050, '/presentations/2022-kubernetes-for-java-developers/slide-040',
  '/presentations/2022-kubernetes-for-java-developers/slide-060', 3);
