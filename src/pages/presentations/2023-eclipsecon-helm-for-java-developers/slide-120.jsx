import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {EclipseCon2023, DeveloperWorkflowDiagram, JKubeLogo} from '../../../components';

const Slide120 = () => {
  return (
    <EclipseCon2023.SlideTemplate slide={12} title='What is Eclipse JKube? (II)'>
      <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
        <JKubeLogo textColor='#FFF' transform='rotate(270)' style={{height: '10rem', animation: 'fade-in 5s linear backwards'}} />
        <DeveloperWorkflowDiagram style={{height: '100%', fontFamily: 'Roboto'}} />
      </div>
    </EclipseCon2023.SlideTemplate>
  );
};

export default slideControls(Slide120,
  `/presentations/${EclipseCon2023.SLUG}/slide-110`,
  `/presentations/${EclipseCon2023.SLUG}/slide-130`);
