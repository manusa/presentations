import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {EclipseCon2023} from '../../../components';

const Slide090 = () => (
    <EclipseCon2023.TitleTemplate
      title='What is Eclipse JKube?'
    />
  );

export default slideControls(Slide090,
  `/presentations/${EclipseCon2023.SLUG}/slide-080`,
  `/presentations/${EclipseCon2023.SLUG}/slide-100`);
