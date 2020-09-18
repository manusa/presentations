import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';

const Slide9 = () => (
  <SlideTemplate slide={9} title="What's coming - Roadmap">
    <ul>
      <li>Additional build strategies (Kaniko)</li>
      <li>Gradle Plugins</li>
      <li>Support for more frameworks</li>
      <li>...get involved to decide</li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide9, '/presentations/eclipse-jkube-introduction/slide8', '/presentations/eclipse-jkube-introduction/slide10');
