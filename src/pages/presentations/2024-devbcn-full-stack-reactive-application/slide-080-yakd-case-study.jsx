import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import { DevBcn2024} from '../../../components';

const Slide080 = () => {
  return (
    <DevBcn2024.TitleTemplate
      slide={8}
      title='Yet Another Kubernetes Dashboard (YAKD)'
      subtitle='Case Study'
    />
  );
};

export default slideControls(Slide080,
  `/presentations/${DevBcn2024.SLUG}/slide-070-kubernetes-streams`,
  `/presentations/${DevBcn2024.SLUG}/slide-090-yakd-introduction`
);
