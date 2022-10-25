import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {TitleTemplate} from './components/title-template';
import {SLUG} from './index';

const Slide070 = () => (
  <TitleTemplate
    title='Sailing into the North Wind'
    subtitle='Demo'
  />
);

export default slideControls(Slide070, `/presentations/${SLUG}/slide-060`, `/presentations/${SLUG}/slide-080`);
