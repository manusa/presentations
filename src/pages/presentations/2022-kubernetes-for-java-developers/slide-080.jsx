import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DeveloperWorkflowDiagram, JKubeLogo} from '../../../components';
import SlideTemplate from './components/slide-template';

import './styles/slide-jkube-developer-workflow.scss';

const Slide080 = () => (
  <SlideTemplate slide={8} title='What is Eclipse JKube? Simplified Developer Workflow'>
    <div className='workflow-container'>
      <JKubeLogo className='jkube-logo' transform='rotate(270)' />
      <DeveloperWorkflowDiagram className='jkube-developer-workflow' />
    </div>
  </SlideTemplate>
);

export default slideControls(Slide080, '/presentations/2022-kubernetes-for-java-developers/slide-070',
  '/presentations/2022-kubernetes-for-java-developers/slide-090');
