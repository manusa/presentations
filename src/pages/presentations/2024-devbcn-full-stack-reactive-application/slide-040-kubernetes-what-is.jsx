import React from 'react';
import slideControls, {
  visibleClassNameFromStep,
} from '../../../components/slide-controls/slide-controls';
import {DevBcn2024, kubernetesComponentsDiagram} from '../../../components';

const Slide040 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <DevBcn2024.SlideTemplate slide={4} title='What is Kubernetes?'>
      <div>
        <blockquote>
          <p>
            Kubernetes is a portable, extensible, open-source platform for managing <strong>containerized</strong>
            workloads and services, that facilitates both <strong>declarative</strong> configuration and automation
          </p>
          <cite>Kubernetes.io</cite>
        </blockquote>
      </div>
      <div
        className={classNameVisibleFrom(2)}
        style={{margin: '1rem 0', textAlign: 'center', fontSize: '3.2rem', background: DevBcn2024.BLUE}}
      >
        Platform to deploy and orchestrate <strong>containerized</strong> applications
      </div>
      <div className={classNameVisibleFrom(3)} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <img
          src={kubernetesComponentsDiagram} alt='A diagram of the Kubernetes components'/>
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide040,
  `/presentations/${DevBcn2024.SLUG}/slide-030-reactive-applications`,
  `/presentations/${DevBcn2024.SLUG}/slide-050-kubernetes-resources`,
  3
);
