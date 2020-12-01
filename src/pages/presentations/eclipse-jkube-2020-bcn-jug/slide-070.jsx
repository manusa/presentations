import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';

const Slide070 = () => (
  <TitleTemplate
    title='Demo Time'
    subtitle='One JKube to rule them all'
  />
);

export default slideControls(Slide070, '/presentations/eclipse-jkube-2020-bcn-jug/slide-060', '/presentations/eclipse-jkube-2020-bcn-jug/slide-080');
