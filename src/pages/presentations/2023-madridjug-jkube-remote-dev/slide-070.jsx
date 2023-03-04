import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {TitleTemplate} from './components/title-template';
import {SLUG} from './index';

const Slide070 = () => (
  <TitleTemplate
    title='Demo: Sailing into the North Wind'
    subtitle='https://github.com/marcnuri-demo/jkube-remote-dev'
  />
);

export default slideControls(Slide070, `/presentations/${SLUG}/slide-060`, `/presentations/${SLUG}/slide-080`);
