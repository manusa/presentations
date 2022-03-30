import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';
import './styles/index.scss';

const Slide110 = () => (
  <TitleTemplate
    title='Kubernetes controllers and operators in Java'
    subtitle='Controller and Operator patterns'
  />
);

export default slideControls(Slide110, '/presentations/2022-kubernetes-for-java-developers/slide-100',
  '/presentations/2022-kubernetes-for-java-developers/slide-120');
