import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';

const Slide050 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <SlideTemplate slide={5} title='What is Eclipse JKube?'>
      <ul className='what-is-jkube'>
        <li>
          Tools and plugins
          <ul>
            <li>Generate container images</li>
            <li>Generate and deploy configuration manifests (Kubernetes / OpenShift)</li>
          </ul>
        </li>
        <li className={classNameVisibleFrom(2)}>
          Components
          <table style={{width: '80%'}}>
            <thead>
              <tr>
                <th colSpan={2}>Java API (JKube Kit)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kubernetes Maven Plugin</td>
                <td>Kubernetes Gradle Plugin</td>
              </tr>
              <tr>
                <td>OpenShift Maven Plugin</td>
                <td>OpenShift Gradle Plugin</td>
              </tr>
            </tbody>
          </table>
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

export default slideControls(Slide050, '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-040', '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-060', 3);
