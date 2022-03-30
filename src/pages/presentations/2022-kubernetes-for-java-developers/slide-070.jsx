import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {JKubeLogo} from '../../../components';
import SlideTemplate from './components/slide-template';
import DeveloperWorkflowDiagram from './components/developer-workflow-diagram';

import './styles/slide-jkube-developer-workflow.scss';

const Slide070 = () => (
  <SlideTemplate slide={7} title='What is Eclipse JKube? Simplified Developer Workflow'>
    <div className='workflow-container'>
      <JKubeLogo className='jkube-logo' transform='rotate(270)' />
      <DeveloperWorkflowDiagram className='jkube-developer-workflow' />
    </div>
  </SlideTemplate>
);

export default slideControls(Slide070, '/presentations/2022-kubernetes-for-java-developers/slide-060',
  '/presentations/2022-kubernetes-for-java-developers/slide-080');
