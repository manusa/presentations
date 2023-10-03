import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {EclipseCon2023} from '../../../components';

const Slide040 = () => (
    <EclipseCon2023.TitleTemplate
      title='Challenges'
      subtitle='Deploying Java applications to Kubernetes'
    />
  );

export default slideControls(Slide040,
  `/presentations/${EclipseCon2023.SLUG}/slide-030`,
  `/presentations/${EclipseCon2023.SLUG}/slide-050`);
