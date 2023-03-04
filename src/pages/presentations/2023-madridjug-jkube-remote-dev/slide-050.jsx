import React from 'react';
import slideControls, {visibleClassNameInStep} from '../../../components/slide-controls/slide-controls';
import {SlideTemplate} from './components/slide-template';
import {SLUG} from './index';
import {RemoteDevelopmentKubernetesDiagram, RemoteDevelopmentKubernetesDiagramRemote} from '../../../components';

import './styles/slide-remote-development-diagram.scss';

const Slide050 = ({currentStep}) => {
  const classNameVisibleIn = visibleClassNameInStep(currentStep);
  return (
    <SlideTemplate slide={5} title="Eclipse JKube - Remote Development (2)">
      <div className='remote-development'>
        <RemoteDevelopmentKubernetesDiagram className={classNameVisibleIn(1)} />
        <RemoteDevelopmentKubernetesDiagramRemote className={classNameVisibleIn(2)} />
      </div>
    </SlideTemplate>
  );
};

export default slideControls(Slide050, `/presentations/${SLUG}/slide-040`, `/presentations/${SLUG}/slide-060`, 2);
