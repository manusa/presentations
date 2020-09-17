import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';
import DeveloperWorkflowDiagram from './components/developer-workflow-diagram';
import JKubeLogo from './components/jkube-logo';
import './styles/slide5.scss';

const Slide5 = () => (
  <SlideTemplate slide={5} title='What is Eclipse JKube? Simplified Developer Workflow'>
    <div className='workflow-container'>
      <JKubeLogo className='jkube-logo' transform='rotate(270)' />
      <DeveloperWorkflowDiagram className='jkube-developer-workflow' />
    </div>
  </SlideTemplate>
);

export default slideControls(Slide5, '/presentations/eclipse-jkube-introduction/slide4', '/presentations/eclipse-jkube-introduction/slide6');
