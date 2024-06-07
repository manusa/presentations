import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2024} from '../../../components';

const Slide180 = () => {
  return (
    <DevBcn2024.TitleTemplate
      slide={18}
      title='Frontend: Consuming Events Reactively'
      subtitle='YAKD Frontend'
    />
  );
};

export default slideControls(Slide180,
  `/presentations/${DevBcn2024.SLUG}/slide-170-watching-kubernetes-resources`,
  `/presentations/${DevBcn2024.SLUG}/slide-190-keeping-state`);
