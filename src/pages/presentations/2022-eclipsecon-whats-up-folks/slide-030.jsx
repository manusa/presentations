import React from 'react';
import slideControls, {visibleClassNameFromStep, visibleClassNameUntilStep} from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';
import {SLUG} from './index';

const Slide030 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  const classNameVisibleUntil = visibleClassNameUntilStep(currentStep);
  return (
    <SlideTemplate slide={3} title='What is Eclipse JKube?'>
      <ul className='what-is-jkube'>
        <li className={classNameVisibleUntil(2)}>
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
          Goals
          <table style={{width: '80%'}}>
            <thead>
            <tr>
              <th>Inner Loop</th>
              <th>Outer Loop</th>
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
      </ul>
    </SlideTemplate>
  );
};

export default slideControls(Slide030, `/presentations/${SLUG}/slide-020`, `/presentations/${SLUG}/slide-040`, 3);
