import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';
import './styles/index.scss';

const Slide090 = () => (
  <TitleTemplate
    title='Controlling Kubernetes from Java'
    subtitle='Fabric8 Kubernetes Client + JBang'
  />
);

export default slideControls(Slide090, '/presentations/2022-kubernetes-for-java-developers/slide-080',
  '/presentations/2022-kubernetes-for-java-developers/slide-100');
