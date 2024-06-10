import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2024} from '../../../components';

const CmdWindow = ({style, children}) => {
  return (
    <Code language='text' customStyle={{flex: 1, fontSize: '1.5rem', background: '#232323CC', ...style}}>
        {children}
    </Code>
  )
};

const podsSteps = {
  2: ['$ kubectl get pods --watch'],
  3: ['NAME               READY   STATUS              RESTARTS   AGE', ''],
  4: ['devbcn-2024-5c65   0/1     Pending             0          0s'],
  5: ['devbcn-2024-5c65   0/1     ContainerCreating   0          1s'],
  6: ['devbcn-2024-5c65   0/1     Running             0          4s'],
  7: ['devbcn-2024-5c65   1/1     Running             0          8s']
};


const deploySteps = {
  2: ['$ kubectl get deploy --watch'],
  3: [
    'NAME          READY   UP-TO-DATE   AVAILABLE   AGE',
    'devbcn-2024   0/0     0            0           0s'
  ],
  4: ['devbcn-2024   0/1     0            0           1s'],
  5: ['devbcn-2024   0/1     0            0           2s'],
  6: ['devbcn-2024   0/1     1            0           5s'],
  7: ['devbcn-2024   1/1     1            1           9s']
};

const reduceStep = ({currentStep, obj}) => {
  let ret = '';
  for (let it = 0; it <= currentStep; it++) {
    if (obj[it]) {
      for (const line of obj[it]) {
        ret += line + '\n';
      }
    }
  }
  return ret;
}

const Slide070 = ({currentStep}) => {
  return (
    <DevBcn2024.SlideTemplate slide={7} title='Kubernetes Streams'>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
        <img
          style={{alignSelf: 'center', width: '78rem'}}
          src={DevBcn2024.kubernetesStreamResources}
          alt='A diagram of the Kubernetes components'
        />
        <div style={{display: currentStep > 1 ? 'flex' : 'none', justifyContent: 'center', gap: '2rem'}}>
          <CmdWindow style={{width: 'auto'}}>{
            reduceStep({currentStep, obj: podsSteps})
          }</CmdWindow>
          <CmdWindow style={{width: 'auto'}}>{
            reduceStep({currentStep, obj: deploySteps})
          }</CmdWindow>
        </div>
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide070,
  `/presentations/${DevBcn2024.SLUG}/slide-060-kubernetes-event-producer`,
  `/presentations/${DevBcn2024.SLUG}/slide-080-yakd-case-study`,
  7);
