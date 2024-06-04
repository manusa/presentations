import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2024, PodIcon, DeploymentIcon} from '../../../components';

const ResourceContainer = ({className, children}) => (
  <div className={className} style={{flex: '1 1 0', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    {children}
  </div>
);

const Slide050 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <DevBcn2024.SlideTemplate slide={5} title='Kubernetes Resources'>
      <div>
        <ul>
          <li>Kubernetes Resources: objects to manage the state of the cluster and application</li>
        </ul>
      </div>
      <div style={{display: 'flex', marginTop: '10rem'}}>
        <ResourceContainer className={classNameVisibleFrom(2)}>
          <PodIcon style={{height: '10rem'}} />
          <h3>Pod</h3>
          <ul>
            <li>Minimum deployment unit</li>
            <li>One or more containers</li>
            <li>Shared network namespace & IP</li>
          </ul>
        </ResourceContainer>
        <ResourceContainer className={classNameVisibleFrom(3)}>
          <DeploymentIcon style={{height: '10rem'}}/>
          <h3>Deployment</h3>
          <ul>
            <li>Manages a <i>replica</i> set of Pods</li>
            <li>Rollout, Update, Rollback</li>
            <li>High Availability</li>
          </ul>
        </ResourceContainer>
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide050,
  `/presentations/${DevBcn2024.SLUG}/slide-040-kubernetes-what-is`,
  `/presentations/${DevBcn2024.SLUG}/slide-060-kubernetes-event-producer`,
  3);
