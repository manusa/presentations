import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';
import DeveloperWorkflowDiagram from './components/developer-workflow-diagram';
import JKubeLogo from './components/jkube-logo';
import './styles/slide-jkube-developer-workflow.scss';

const Slide040 = () => (
  <SlideTemplate slide={4} title='What is Eclipse JKube? Kubernetes Maven Plugin'>
    <div className='workflow-container'>
      <JKubeLogo className='jkube-logo' transform='rotate(270)' />
      <DeveloperWorkflowDiagram className='jkube-developer-workflow' />
    </div>
  </SlideTemplate>
);

export default slideControls(Slide040, '/presentations/eclipse-jkube-2021-cloud-tool-time/slide-030', '/presentations/eclipse-jkube-2021-cloud-tool-time/slide-050');
