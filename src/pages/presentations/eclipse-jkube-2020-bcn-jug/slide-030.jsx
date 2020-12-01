import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls, {
  visibleClassNameFromStep,
  visibleClassNameInStep
} from '../../../components/slide-controls/slide-controls';
import JKubeLogo from './components/jkube-logo';
import KubernetesLogo from './components/kubernetes-logo';
import OpenShiftLogo from './components/openshift-logo';
import cncfLogo from './assets/cncf-logo.png';
import oldMan from './assets/adult-elderly-face-man-old-person-side-view-square.jpg';
import docker from './assets/docker-moby-logo.png';
import namespace from './assets/kubernetes/ns-256.png';
import deployment from './assets/kubernetes/deploy-256.png';
import replicaSet from './assets/kubernetes/rs-256.png';
import pod from './assets/kubernetes/pod-256.png';
import service from './assets/kubernetes/svc-256.png';
import ingress from './assets/kubernetes/ing-256.png';
import configMap from './assets/kubernetes/cm-256.png';
import secret from './assets/kubernetes/secret-256.png';
import volume from './assets/kubernetes/vol-256.png';

import './styles/slide-cloud-native.scss';

const CloudNativeDefinition = ({className = '', ...props}) => (
  <div className={`cloud-native-definition ${className}`} {...props}>
    <div className='quote'>
      <blockquote>
        <p>
          Cloud native technologies empower organizations to build and run scalable applications in modern, dynamic
          environments such as public, private, and hybrid clouds. Containers, service meshes, microservices, immutable
          infrastructure, and declarative APIs exemplify this approach.
        </p>
        <cite>Cloud Native Computing Foundation (CNCF)</cite>
      </blockquote>
      <img src={cncfLogo} className='picture cncf-logo' />
    </div>
    <div className='quote'>
      <blockquote className='text'>
        <p>
          Deploying my Java app into Kubernetes isn't stressing me out.
        </p>
        <cite>Benjamin Price, 23 years old.</cite>
      </blockquote>
      <img src={oldMan} className='picture' />
    </div>
  </div>
);

const MicroserviceArchitecture = ({className = '', ...props}) => (
  <div className={`microservice-architecture ${className}`} {...props}>
    <h2>Microservice / Distributed Architecture</h2>
    <h3>Challenges</h3>
    <ul>
      <li>Data consistency and transactionality</li>
      <li>Security</li>
      <li>Service discovery</li>
      <li>Service Communications (Point 2 point connections, Messaging, service mesh)</li>
      <li>Distributed logging</li>
      <li>Monitoring</li>
      <li>Fault tolerance</li>
      <li>Twelve-factor apps, design to fail, resilience, ...</li>
    </ul>
  </div>
);

const DeveloperWorkflow = ({className = '', classNameVisibleFrom, transparentStyleFrom, ...props}) => (
  <div className={`developer-workflow ${className}`} {...props}>
    <h2>Developer Workflow</h2>
    <div className='technologies'>
      <KubernetesLogo className={`${classNameVisibleFrom(4)} item`} style={transparentStyleFrom(7)} />
      <OpenShiftLogo className={`${classNameVisibleFrom(4)} item`} style={transparentStyleFrom(7)} textColor='white' />
      <img className={`${classNameVisibleFrom(5)} item`} style={transparentStyleFrom(7)} src={docker} />
      <img className={`${classNameVisibleFrom(6)} item`} style={transparentStyleFrom(7)} src={namespace} />
      <img className={`${classNameVisibleFrom(6)} item`} style={transparentStyleFrom(7)} src={deployment} />
      <img className={`${classNameVisibleFrom(6)} item`} style={transparentStyleFrom(7)} src={replicaSet} />
      <img className={`${classNameVisibleFrom(6)} item`} style={transparentStyleFrom(7)} src={pod} />
      <img className={`${classNameVisibleFrom(6)} item`} style={transparentStyleFrom(7)} src={service} />
      <img className={`${classNameVisibleFrom(6)} item`} style={transparentStyleFrom(7)} src={ingress} />
      <img className={`${classNameVisibleFrom(6)} item`} style={transparentStyleFrom(7)} src={configMap} />
      <img className={`${classNameVisibleFrom(6)} item`} style={transparentStyleFrom(7)} src={secret} />
      <img className={`${classNameVisibleFrom(6)} item`} style={transparentStyleFrom(7)} src={volume} />
      <div className={`jkube-logo ${classNameVisibleFrom(7)}`}>
        <JKubeLogo className='jkube-logo__image' />
      </div>
    </div>
  </div>
);

const transparentStyleFromStep = currentStep => step => (currentStep >= step ? ({opacity: 0.2}) : ({}));

const Slide030 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  const classNameVisibleIn = visibleClassNameInStep(currentStep);
  const transparentStyleFrom = transparentStyleFromStep(currentStep);
  return (
    <SlideTemplate slide={3} title='Cloud Native Java'>
      <CloudNativeDefinition className={classNameVisibleIn(1)} />
      <MicroserviceArchitecture className={classNameVisibleIn(2)} />
      <DeveloperWorkflow
        className={classNameVisibleFrom(3)} classNameVisibleFrom={classNameVisibleFrom}
        transparentStyleFrom={transparentStyleFrom}/>
    </SlideTemplate>
  );
};


export default slideControls(Slide030, '/presentations/eclipse-jkube-2020-bcn-jug/slide-020', '/presentations/eclipse-jkube-2020-bcn-jug/slide-040', 7);
