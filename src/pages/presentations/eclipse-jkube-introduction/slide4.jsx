import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';
import './styles/slide4.scss';

const Slide4 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <SlideTemplate slide={4} title='What is Eclipse JKube?'>
      <ul className='what-is-jkube'>
        <li>
          Tools and plugins
          <ul>
            <li>Generate container images</li>
            <li>Generate and deploy configuration manifests (Kubernetes / OpenShift)</li>
          </ul>
        </li>
        <li className={classNameVisibleFrom(2)}>
          Standalone Java API (Kit) & Maven Plugins
          <ul>
            <li>Kubernetes Maven Plugin (k8s)</li>
            <li>OpenShift Maven Plugin (oc)</li>
          </ul>
        </li>
        <li className={classNameVisibleFrom(3)}>
          Build Strategies
          <ul>
            <li><strong>Docker:</strong> uses local Docker Daemon (k8s) or remote (oc)</li>
            <li><strong>S2I:</strong> OC only plugin configuration</li>
            <li><strong>JIB:</strong> delegates to build to JIB (Dockerless)</li>
          </ul>
        </li>
      </ul>
    </SlideTemplate>
  );
};

export default slideControls(Slide4, '/presentations/eclipse-jkube-introduction/slide3', '/presentations/eclipse-jkube-introduction/slide5', 3);
