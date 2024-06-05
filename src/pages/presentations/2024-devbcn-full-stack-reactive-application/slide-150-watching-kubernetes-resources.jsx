import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2024, kubernetesComponentsDiagram} from '../../../components';


const Slide150 = ({currentStep}) => {
  const visibleFrom = step => currentStep >= step;
  // TODO: Use icons instead
  return (
    <DevBcn2024.SlideTemplate slide={15} title='Why Quarkus?'>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide150,
  `/presentations/${DevBcn2024.SLUG}/slide-140-why-quarkus`,
  `/presentations/${DevBcn2024.SLUG}/slide-160`,
  5);
