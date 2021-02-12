import React from 'react';
import {Helmet} from 'react-helmet';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';

import './styles/index.scss';

const TITLE = 'Deploying a Quarkus application into Kubernetes using JKube';
const SUBTITLE = 'Marc Nuri';

const EclipseJKubeIntroduction = () => (
  <div className='eclipse-jkube-2021-cloud-tool-time'>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <TitleTemplate className='eclipse-jkube-2021-cloud-tool-time-index' title={TITLE} subtitle={SUBTITLE} />
  </div>
);

export default slideControls(EclipseJKubeIntroduction, '/', '/presentations/eclipse-jkube-2021-cloud-tool-time/slide-010');
