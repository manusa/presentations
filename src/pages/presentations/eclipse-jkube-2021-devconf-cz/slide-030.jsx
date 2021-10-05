import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls, {visibleClassNameFromStep, visibleClassNameInStep, visibleClassNameUntilStep} from '../../../components/slide-controls/slide-controls';
import DockerLogo from '../../../components/icons/docker-logo';
import JavaIcon from '../../../components/icons/java-icon';
import KubernetesLogo from '../../../components/icons/kubernetes-logo';
import RightArrow from '../../../components/shapes/right-arrow';

import ServerIcon from '../../../components/icons/server-icon';
import VcsIcon from '../../../components/icons/vcs-icon';
import './styles/slide-workflow.scss';

const arrowSize = 120;

const Slide030 = ({currentStep}) => {
  const classNameVisibleIn = visibleClassNameInStep(currentStep);
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  const classNameVisibleUntil = visibleClassNameUntilStep(currentStep);
  return (
    <SlideTemplate slide={3} title='Introduction'>
      <div className='work-flow'>
        <div className='work-flow__content'>
          <div className='work-flow__code'>
            <VcsIcon className='work-flow__icon' />
            <div className='work-flow__description'>Code</div>
          </div>
          <div className='work-flow__arrow'>
            <RightArrow height={arrowSize} />
            <div>Build</div>
          </div>
          <div className='work-flow__package'>
            <JavaIcon className={`work-flow__icon ${classNameVisibleUntil(2)}`}/>
            <DockerLogo className={`work-flow__icon ${classNameVisibleFrom(3)}`}/>
            <ul className='work-flow__description'>
              <li>Fat Jar / War / Ear</li>
              <li className={classNameVisibleFrom(3)}>JRE</li>
              <li className={classNameVisibleFrom(3)}>OS</li>
            </ul>
          </div>
          <div className='work-flow__arrow'>
            <RightArrow height={arrowSize} />
            <div>Deploy</div>
          </div>
          <div className='work-flow__server'>
            <ServerIcon className={`work-flow__icon ${classNameVisibleIn(1)}`}/>
            <KubernetesLogo className={`work-flow__icon ${classNameVisibleFrom(2)}`}/>
            <ul className='work-flow__description'>
              <li className={classNameVisibleIn(1)}>Server</li>
              <li className={classNameVisibleIn(1)}>JRE</li>
              <li className={classNameVisibleIn(1)}>OS</li>
              <li className={classNameVisibleFrom(2)}>Kubernetes</li>
            </ul>
          </div>
        </div>
      </div>
    </SlideTemplate>
  );
};

export default slideControls(Slide030, '/presentations/eclipse-jkube-2021-devconf-cz/slide-020', '/presentations/eclipse-jkube-2021-devconf-cz/slide-040', 3);
