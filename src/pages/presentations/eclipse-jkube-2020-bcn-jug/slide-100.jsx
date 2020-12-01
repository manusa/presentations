import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';

const Slide100 = () => (
  <TitleTemplate
    title='Quarkus the easy way...'
    subtitle='Demo'
  />
);

export default slideControls(Slide100, '/presentations/eclipse-jkube-2020-bcn-jug/slide-090', '/presentations/eclipse-jkube-2020-bcn-jug/slide-110');
