import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';
import './styles/index.scss';

const Slide7 = () => (
  <TitleTemplate
    title='From zero to cloud with Maven and Eclipse JKube'
    subtitle='Demo'
  />
);

export default slideControls(Slide7, '/presentations/eclipse-jkube-introduction/slide6', '/presentations/eclipse-jkube-introduction/slide8');
