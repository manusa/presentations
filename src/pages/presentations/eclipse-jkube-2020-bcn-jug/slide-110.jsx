import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';

const Slide110 = () => (
  <TitleTemplate
    title="Spring Boot 1.x - We won't forget you!"
    subtitle='Demo'
  />
);

export default slideControls(Slide110, '/presentations/eclipse-jkube-2020-bcn-jug/slide-100', '/presentations/eclipse-jkube-2020-bcn-jug/slide-120');
