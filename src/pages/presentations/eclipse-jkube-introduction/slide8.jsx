import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';
import './styles/index.scss';

const Slide8 = () => (
  <TitleTemplate
    title='Old school Java Web application ready for the cloud'
    subtitle='Demo'
  />
);

export default slideControls(Slide8, '/presentations/eclipse-jkube-introduction/slide7', '/presentations/eclipse-jkube-introduction/slide9');
