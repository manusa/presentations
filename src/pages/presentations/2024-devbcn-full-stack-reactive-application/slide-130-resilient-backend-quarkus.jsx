import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import { DevBcn2024} from '../../../components';

const Slide130 = () => {
  return (
    <DevBcn2024.TitleTemplate
      slide={13}
      title='Building a Resilient Backend with Quarkus'
      subtitle='Java'
    />
  );
};

export default slideControls(Slide130,
  `/presentations/${DevBcn2024.SLUG}/slide-120-yakd-backend`,
  `/presentations/${DevBcn2024.SLUG}/slide-140-why-quarkus`
);
