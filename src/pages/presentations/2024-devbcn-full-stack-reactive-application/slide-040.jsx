import React from 'react';
import slideControls, {
  visibleClassNameFromStep,
  visibleClassNameInStep,
  visibleClassNameUntilStep
} from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2024, KubernetesControlLoopDiagram, kubernetesComponentsDiagram} from '../../../components';

const Slide040 = ({currentStep}) => {
  const classNameVisibleIn = visibleClassNameInStep(currentStep);
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  const classNameVisibleUntil = visibleClassNameUntilStep(currentStep);
  const centerStyle = {
    position: 'absolute',
    top: '1rem',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
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
      <div
        className={classNameVisibleFrom(3)}
        style={centerStyle}
      >
        <KubernetesControlLoopDiagram style={{height: '100%'}} />
      </div>
      <div className={classNameVisibleFrom(4)} style={{gap: '2rem', ...centerStyle}}>
        <Code language='yaml' customStyle={{border: '1px solid', borderColor: DevBcn2024.ORANGE, boxShadow: '1rem 1rem 2rem 0px #33333390'}}>{`
            kind: Deployment
            metadata:
              name: app
            spec:
              replicas: 1
            # ...
            # ...
            status:
              availableReplicas: 1
              readyReplicas: 0
            # ...
            # ...
        `}</Code>
        <Code language='yaml' customStyle={{border: '1px solid', borderColor: DevBcn2024.ORANGE, boxShadow: '1rem 1rem 2rem 0px #33333390'}}>{`
            kind: Pod
            metadata:
              name: app-1337
            spec:
              containers:
               - name: app
            # ...
            status:
              containerStatuses:
               - name: app
                 ready: false
            # ...
        `}</Code>
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide040,
  `/presentations/${DevBcn2024.SLUG}/slide-030`,
  `/presentations/${DevBcn2024.SLUG}/slide-050`,
  4
);
