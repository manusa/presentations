import React from 'react';
import slideControls, {
  visibleClassNameFromStep,
} from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2024, KubernetesControlLoopDiagram} from '../../../components';

const Slide060 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
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
  /*
  * EN la analogía del termonstato, emplear palabros Kubernetes "El controller decidirá..."
   */
  return (
    <DevBcn2024.SlideTemplate slide={6} title='Kubernetes as an Event Producer'>
      <KubernetesControlLoopDiagram style={{height: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} />
      <div className={classNameVisibleFrom(2)} style={{gap: '2rem', ...centerStyle}}>
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
            # ....................
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
            # ....................
        `}</Code>
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide060,
  `/presentations/${DevBcn2024.SLUG}/slide-050-kubernetes-resources`,
  `/presentations/${DevBcn2024.SLUG}/slide-070-kubernetes-streams`,
  2
);
