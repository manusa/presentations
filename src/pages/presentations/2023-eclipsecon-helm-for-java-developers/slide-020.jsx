import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {EclipseCon2023} from '../../../components';

const Slide020 = () => {
  return (
    <EclipseCon2023.SlideTemplate slide={2} title='Agenda'>
      <div style={{height: '100%', display: 'flex', gap: '3rem', alignItems: 'center'}}>
        <EclipseCon2023.PopeyeThumbsUp style={{height: '40vh'}} />
        <ul style={{flex: 1}}>
          <li>Inner Loop vs. Outer Loop</li>
          <li>Deploying applications to Kubernetes - Challenges</li>
          <li>What is Eclipse JKube?</li>
          <li>Demo time</li>
          <li>Q&A</li>
        </ul>
      </div>
    </EclipseCon2023.SlideTemplate>
  );
};

export default slideControls(Slide020,
  `/presentations/${EclipseCon2023.SLUG}/slide-010`,
  `/presentations/${EclipseCon2023.SLUG}/slide-030`);
