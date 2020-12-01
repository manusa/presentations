import React from 'react';
import {Helmet} from 'react-helmet';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';

import './styles/index.scss';

const TITLE = 'Microservice Containerization made easy using Eclipse JKube';
const SUBTITLE = 'Marc Nuri';

const EclipseJKubeIntroduction = () => (
  <div className='eclipse-jkube-2020-bcn-jug'>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <TitleTemplate className='eclipse-jkube-2020-bcn-jug-index' title={TITLE} subtitle={SUBTITLE} />
  </div>
);

export default slideControls(EclipseJKubeIntroduction, '/', '/presentations/eclipse-jkube-2020-bcn-jug/slide-010');
