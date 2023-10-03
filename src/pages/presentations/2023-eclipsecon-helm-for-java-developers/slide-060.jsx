import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {Code, EclipseCon2023} from '../../../components';

const Slide060 = () => {
  return (
    <EclipseCon2023.SlideTemplate slide={6} title='Deploying Java applications to Kubernetes - Challenges (II)'>
      <h2>YAML files</h2>
      <div className='yaml-files' style={{display: 'flex', justifyContent: 'space-between'}}>
        {/* Note the extra-spaces in some of the docs to size them all equally*/}
        <Code language='yaml'>{`
          kind: Deployment    
          metadata:
            name: app
          spec:
            replicas: 1
            selector:
          # ...
        `}</Code>
        <Code language='yaml'>{`
          kind: Service       
          metadata:
            name: app
          spec:
            ports:
          # ...
        `}</Code>
        <Code language='yaml'>{`
          kind: ConfigMap
          metadata:
            name: app
          data:
           application.yml: >-
          # ...
        `}</Code>
        <Code language='yaml'>{`
          kind: Secret        
          metadata:
            name: app
          type: Opaque
          data:
          # ...
        `}</Code>
      </div>
      <Code language='shell'>{`
        $ kubectl apply -f ./your-yaml.yml
      `}</Code>
    </EclipseCon2023.SlideTemplate>
  );
}

export default slideControls(Slide060,
  `/presentations/${EclipseCon2023.SLUG}/slide-050`,
  `/presentations/${EclipseCon2023.SLUG}/slide-070`);
