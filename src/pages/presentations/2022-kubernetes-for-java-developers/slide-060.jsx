import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';
import './styles/index.scss';

const Slide060 = () => (
  <TitleTemplate
    title='Deploying a Java application into Kubernetes'
    subtitle='Eclipse JKube'
  />
);

export default slideControls(Slide060, '/presentations/2022-kubernetes-for-java-developers/slide-050',
  '/presentations/2022-kubernetes-for-java-developers/slide-070');
