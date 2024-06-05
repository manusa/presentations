import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2024} from '../../../components';

const Slide020 = () => {
  return (
    <DevBcn2024.SlideTemplate slide={2} title='Agenda'>
      <div style={{height: '100%', display: 'flex', gap: '0rem', alignItems: 'center'}}>
        <DevBcn2024.DevBcn
          style={{width: '30rem', fill: 'white', transform: 'rotate(270deg)'}}
          alt='An image of the DevBcn logo'
        />
        <ul style={{flex: 1}}>
          <li>What is a Reactive Application?</li>
          <li>Kubernetes as an Event Producer</li>
          <li>Case study: The YAKD project</li>
          <li>Building a resilient Backend with Quarkus</li>
          <li>Frontend: Consuming Events Reactively</li>
          <li>Synchronizing State with Redux</li>
          <li>?? Challenges ??</li>
          <li>Advantages of Reactive Applications</li>
          <li>Tradeoffs and Challenges</li>
          <li>Q&A</li>
        </ul>
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide020,
  `/presentations/${DevBcn2024.SLUG}/slide-010-about`,
  `/presentations/${DevBcn2024.SLUG}/slide-030-reactive-applications`);
