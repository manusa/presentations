import React from 'react';
import slideControls, {
  visibleClassNameFromStep, visibleClassNameInStep, visibleClassNameUntilStep
} from '../../../components/slide-controls/slide-controls';
import {SlideTemplate} from './components/slide-template';
import {SLUG} from './index';
import {DeveloperWorkflowDiagram, JKubeLogo, KubernetesLogo, OpenShiftLogo} from '../../../components';
import dukeKubernetesSurf from './assets/duke-kubernetes-surf-sc.png';

import './styles/slide-what-is-jkube.scss';

const GoalRow = ({goal, innerLoop = '', outerLoop = ''}) =>
  <tr>
    <td className='left'>{goal}</td>
    <td>{innerLoop}</td>
    <td>{outerLoop}</td>
  </tr>;

const Slide040 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  const classNameVisibleIn = visibleClassNameInStep(currentStep);
  const classNameVisibleUntil = visibleClassNameUntilStep(currentStep);
  return (
    <SlideTemplate slide={4} title='What is Eclipse JKube?'>
      <div className='what-is-jkube'>
        <ul className={classNameVisibleUntil(2)}>
          <li>
            Deploy Java applications into Kubernetes with ease
            <img style={{marginTop: '1rem', marginLeft: '1rem', height: '2rem'}} src={dukeKubernetesSurf} />
          </li>
          <li>
            Tools and plugins
            <ul>
              <li>Generate container images</li>
              <li>
                Generate and deploy configuration manifests
                <ul>
                  <li><KubernetesLogo style={{height: '2rem'}} /> Kubernetes</li>
                  <li><OpenShiftLogo style={{height: '2rem'}} hideText={true} /> OpenShift</li>
                </ul>
              </li>
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
        </ul>
        <div className={`${classNameVisibleIn(3)} workflow-container`}>
          <JKubeLogo className='jkube-logo' transform='rotate(270)' />
          <DeveloperWorkflowDiagram className='jkube-developer-workflow' />
        </div>
        <div className={classNameVisibleFrom(4)}>
          <h2>Features</h2>
          <table style={{width: '80%'}}>
            <thead>
            <tr>
              <th />
              <th>Inner Loop</th>
              <th>Outer Loop</th>
            </tr>
            </thead>
            <tbody>
            <GoalRow goal='build' innerLoop='✅' outerLoop='✅'/>
            <GoalRow goal='push' innerLoop='✔️' outerLoop='✅'/>
            <GoalRow goal='resource' innerLoop='✅' outerLoop='✅️'/>
            <GoalRow goal='apply' innerLoop='✅' outerLoop='✅️'/>
            <GoalRow goal='helm' innerLoop='❌' outerLoop='✅'/>
            <GoalRow goal='helm-push' innerLoop='❌️' outerLoop='✅'/>
            <GoalRow goal='undeploy' innerLoop='✅' outerLoop='✔️'/>
            <GoalRow goal='log' innerLoop='✅' outerLoop='✔️'/>
            <GoalRow goal='watch' innerLoop='✅' outerLoop='❌️'/>
            <GoalRow goal={<strong>remote-dev</strong>} innerLoop='✅' outerLoop='❌'/>
            </tbody>
          </table>
        </div>
      </div>
    </SlideTemplate>
  );
};

export default slideControls(Slide040, `/presentations/${SLUG}/slide-030`, `/presentations/${SLUG}/slide-050`, 4);

