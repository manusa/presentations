import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';

const Slide080 = () => (
  <TitleTemplate
    title='JKube vs. Dockerfile + YAML'
    subtitle='Demo'
  />
);

export default slideControls(Slide080, '/presentations/eclipse-jkube-2021-devconf-cz/slide-070', '/presentations/eclipse-jkube-2021-devconf-cz/slide-090');
