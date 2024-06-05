import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import { DevBcn2024} from '../../../components';

const Slide120 = () => {
  return (
    <DevBcn2024.TitleTemplate
      slide={12}
      title='Building a Resilient Backend with Quarkus'
      subtitle='Java'
    />
  );
};

export default slideControls(Slide120,
  `/presentations/${DevBcn2024.SLUG}/slide-110-yakd-reactive`,
  `/presentations/${DevBcn2024.SLUG}/slide-130`
);
