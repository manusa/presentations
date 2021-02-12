import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';

import './styles/slide-what-is-jkube.scss';

const Slide030 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <SlideTemplate slide={3} title='What is Eclipse JKube?'>
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
          3 configuration modes
          <ul>
            <li><strong>Zero Config</strong>, Opinionated defaults</li>
            <li><strong>XML</strong> plugin configuration</li>
            <li><strong>Resource fragments</strong> enrich missing parts of opinionated defaults</li>
          </ul>
        </li>
      </ul>
    </SlideTemplate>
  );
};

export default slideControls(Slide030, '/presentations/eclipse-jkube-2021-cloud-tool-time/slide-020', '/presentations/eclipse-jkube-2021-cloud-tool-time/slide-040', 3);
