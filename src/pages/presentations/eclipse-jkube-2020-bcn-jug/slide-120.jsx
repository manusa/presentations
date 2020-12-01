import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';

const Slide120 = () => (
  <SlideTemplate slide={12} title="What's coming - Roadmap">
    <ul>
      <li>Additional build strategies (Kaniko)</li>
      <li>Gradle Plugins</li>
      <li>Support for more frameworks</li>
      <li>...get involved to decide</li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide120, '/presentations/eclipse-jkube-2020-bcn-jug/slide-110', '/presentations/eclipse-jkube-2020-bcn-jug/slide-130');
