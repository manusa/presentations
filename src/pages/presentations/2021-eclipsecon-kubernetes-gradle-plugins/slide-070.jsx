import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';
import Code from '../../../components/code';

const Slide070 = () => (
  <SlideTemplate slide={7} title='Kubernetes Gradle Plugin (Preview)'>
    <div className='what-is-jkube'>
      <Code language='groovy'>{`
plugins {
  id 'org.eclipse.jkube.kubernetes' version '1.5.0'
}
      `}</Code>
      <Code language='kotlin'>{`
plugins {
  id("org.eclipse.jkube.openshift") version "1.5.0"
}
      `}</Code>
      <Code language='shell'>{`
$ gradle clean build k8sBuild k8sPush k8sResource k8sApply
$ gradle k8sDebug
$ gradle k8sUndeploy
      `}</Code>
    </div>
  </SlideTemplate>
);

export default slideControls(Slide070, '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-060', '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-080');
