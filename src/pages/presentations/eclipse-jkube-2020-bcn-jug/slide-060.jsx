import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';
import DeveloperWorkflowDiagram from './components/developer-workflow-diagram';
import JKubeLogo from './components/jkube-logo';
import './styles/slide-jkube-developer-workflow.scss';

const Slide060 = () => (
  <SlideTemplate slide={6} title='What is Eclipse JKube? Simplified Developer Workflow'>
    <div className='workflow-container'>
      <JKubeLogo className='jkube-logo' transform='rotate(270)' />
      <DeveloperWorkflowDiagram className='jkube-developer-workflow' />
    </div>
  </SlideTemplate>
);

export default slideControls(Slide060, '/presentations/eclipse-jkube-2020-bcn-jug/slide-050', '/presentations/eclipse-jkube-2020-bcn-jug/slide-070');
