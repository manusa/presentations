import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {EclipseCon2023} from '../../../components';

const Slide140 = () => (
  <EclipseCon2023.TitleTemplate
    title='Demo'
    subtitle=''
  />
);

export default slideControls(Slide140,
  `/presentations/${EclipseCon2023.SLUG}/slide-130`,
  `/presentations/${EclipseCon2023.SLUG}/slide-150`);
