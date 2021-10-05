import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';

const Slide080 = () => (
  <TitleTemplate
    title='Deploying Gradle + Kotlin Spring Boot Petclinic into Kubernetes'
    subtitle='Demo'
  />
);

export default slideControls(Slide080, '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-070', '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-090');
