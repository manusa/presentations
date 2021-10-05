import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';

const Slide090 = () => (
  <SlideTemplate slide={9} title='Why should I choose Eclipse JKube?'>
    <ul>
      <li>Covers complete Workflow (from code to Kubernetes)</li>
      <li>Inner + Outer Loop</li>
      <li>No external dependencies</li>
      <li>The Java way</li>
      <li>Zero Configuration</li>
      <li>Additional tools for Developers (Debug, Watch, etc.)</li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide090, '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-080', '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-100');
