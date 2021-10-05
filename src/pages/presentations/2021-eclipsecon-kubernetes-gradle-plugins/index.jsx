import React from 'react';
import {Helmet} from 'react-helmet';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';
import './styles/index.scss';

const TITLE = 'Containerize and deploy into Kubernetes your Gradle Java project with Eclipse JKube';
const SUBTITLE = 'Marc Nuri';

const EclipseJKubeIntroduction = () => (
  <div className='eclipsecon-2021'>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <TitleTemplate className='eclipsecon-2021-index' title={TITLE} subtitle={SUBTITLE} />
  </div>
);

export default slideControls(EclipseJKubeIntroduction, '/', '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-010');
