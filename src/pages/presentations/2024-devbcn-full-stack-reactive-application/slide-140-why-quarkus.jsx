import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2024, kubernetesComponentsDiagram} from '../../../components';


const Slide140 = ({currentStep}) => {
  const visibleFrom = step => currentStep >= step;
  // TODO: Use icons instead
  return (
    <DevBcn2024.SlideTemplate slide={14} title='Why Quarkus?'>
      <ul>
        <li>Optimized for Java and Kubernetes</li>
        <li>Fast boot times and low memory footprint</li>
        <li>Supports reactive programming out of the box</li>
        <li>Good integration with the Fabric8 Kubernetes Client</li>
      </ul>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide140,
  `/presentations/${DevBcn2024.SLUG}/slide-130-resilient-backend-quarkus`,
  `/presentations/${DevBcn2024.SLUG}/slide-140`);
