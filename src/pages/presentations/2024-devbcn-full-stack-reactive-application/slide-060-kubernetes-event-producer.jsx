import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2024, KubernetesControlLoopDiagram} from '../../../components';

const Slide060 = ({currentStep}) => {
  /*
   * TODO: (Juan) EN la analogía del termostato, emplear palabros Kubernetes "El controller decidirá..."
   */
  return (
    <DevBcn2024.SlideTemplate slide={6} title='Kubernetes as an Event Producer - Controller Pattern'>
      <KubernetesControlLoopDiagram
        style={{height: '98%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}/>
      <img
        style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          width: '18rem',
          opacity: currentStep === 2 ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
        src={DevBcn2024.thermostat}
        alt='A thermostat'
      />
      <div
        style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem',
          opacity: currentStep === 3 ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <Code language='yaml' customStyle={{
          border: '1px solid',
          borderColor: DevBcn2024.ORANGE,
          boxShadow: '1rem 1rem 2rem 0px #33333390'
        }}>{`
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
        <Code language='yaml' customStyle={{
          border: '1px solid',
          borderColor: DevBcn2024.ORANGE,
          boxShadow: '1rem 1rem 2rem 0px #33333390'
        }}>{`
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
      <div style={{position: 'fixed', left: '1rem', bottom: '1rem', fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.5rem'}}>
        https://kubernetes.io/docs/concepts/architecture/controller/<br />
        https://blog.marcnuri.com/kubernetes-operator-vs-controller
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide060,
  `/presentations/${DevBcn2024.SLUG}/slide-050-kubernetes-resources`,
  `/presentations/${DevBcn2024.SLUG}/slide-070-kubernetes-streams`,
  3
);
