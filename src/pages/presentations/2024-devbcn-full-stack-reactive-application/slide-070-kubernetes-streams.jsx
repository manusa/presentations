import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2024} from '../../../components';

const Slide070 = () => {
  return (
    <DevBcn2024.SlideTemplate slide={7} title='Kubernetes Streams'>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide070,
  `/presentations/${DevBcn2024.SLUG}/slide-060-kubernetes-event-producer`,
  `/presentations/${DevBcn2024.SLUG}/slide-080-yakd-case-study`);
