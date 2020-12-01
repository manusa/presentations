import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';

const Slide090 = () => (
  <TitleTemplate
    title='Spring Boot 2.x - Deploying Kafdrop'
    subtitle='Demo'
  />
);

export default slideControls(Slide090, '/presentations/eclipse-jkube-2020-bcn-jug/slide-080', '/presentations/eclipse-jkube-2020-bcn-jug/slide-100');
