import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {Code, EclipseCon2023} from '../../../components';

const StackedCard = ({index = 0, language = 'yaml', children}) => (
  <div style={{position: 'absolute', top: `${index * 4}rem`, left: `${index * 8}rem`, border: '1px solid #777'}}>
    <Code language={language} customStyle={{margin: 0}} >{children}</Code>
  </div>
  );

const Slide070 = () => {
  return (
    <EclipseCon2023.SlideTemplate slide={7} title='Deploying Java applications to Kubernetes - Challenges (III)'>
      <div className='helm-charts'>
        <h2>Helm charts</h2>
        <div style={{display: 'flex', gap: '5rem', alignItems: 'flex-start'}}>
          <Code language='shell' customStyle={{margin: 0}}>{`
            ├── Chart.yaml
            ├── LICENSE
            ├── README.md
            ├── templates
            │   ├── config-map.yaml
            │   ├── deployment.yaml
            │   ├── secret.yaml
            │   └── service.yaml
            └── values.yaml
          `}</Code>
          <div style={{position: 'relative', minHeight: '35rem'}}>
            <StackedCard>{`
              kind: Deployment    
              metadata:
                name: app
              spec:
                replicas: 1
              # ...
            `}</StackedCard>
            <StackedCard index={1}>{`
              kind: Service       
              metadata:
                name: app
              spec:
                ports:
              # ...
            `}</StackedCard>
            <StackedCard index={2}>{`
              kind: ConfigMap
              metadata:
                name: app
              data:
               application.yml: >-
              # ...
            `}</StackedCard>
            <StackedCard index={3}>{`
              kind: Secret        
              metadata:
                name: app
              type: Opaque
              data:
              # ...
            `}</StackedCard>
          </div>
        </div>
        <Code language='shell'>{`
        $ helm create
        $ helm push
      `}</Code>
      </div>
    </EclipseCon2023.SlideTemplate>
  );
};

export default slideControls(Slide070,
  `/presentations/${EclipseCon2023.SLUG}/slide-060`,
  `/presentations/${EclipseCon2023.SLUG}/slide-080`);
