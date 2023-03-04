import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {TitleTemplate} from './components/title-template';
import {SLUG} from './index';

const Slide060 = () => (
  <TitleTemplate
    title='Demo: Sailing into the North Wind'
    subtitle='https://github.com/marcnuri-demo/jkube-remote-dev'
  />
);

export default slideControls(Slide060, `/presentations/${SLUG}/slide-050`, `/presentations/${SLUG}/slide-070`);
