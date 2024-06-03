import React from 'react';
import slideControls, {
  visibleClassNameInStep,
  visibleClassNameUntilStep
} from '../../../components/slide-controls/slide-controls';
import {DevBcn2024, kubernetesComponentsDiagram} from '../../../components';

const Slide040 = ({currentStep}) => {
  const classNameVisibleIn = visibleClassNameInStep(currentStep);
  const classNameVisibleUntil = visibleClassNameUntilStep(currentStep);
  return (
    <DevBcn2024.SlideTemplate slide={4} title='What is Kubernetes?'>
      <div className={`${classNameVisibleUntil(2)}`}>
        <blockquote>
          <p>
            Kubernetes is a portable, extensible, open-source platform for managing containerized
            workloads and services, that facilitates both <strong>declarative</strong> configuration and automation
          </p>
          <cite>Kubernetes.io</cite>
        </blockquote>
      </div>
      <div className={classNameVisibleIn(2)} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <img
          src={kubernetesComponentsDiagram} alt='A diagram of the Kubernetes components'/>
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide040,
  `/presentations/${DevBcn2024.SLUG}/slide-030-reactive-applications`,
  `/presentations/${DevBcn2024.SLUG}/slide-050-kubernetes-event-producer`,
  2
);
