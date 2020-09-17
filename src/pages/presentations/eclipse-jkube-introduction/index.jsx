import React from 'react';
import {Helmet} from 'react-helmet';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';
import './styles/index.scss';

const TITLE = 'Deploy your Java applications to the Cloud using Eclipse JKube';
const SUBTITLE = 'Marc Nuri';

const EclipseJKubeIntroduction = () => (
  <div className='eclipse-jkube-introduction'>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <TitleTemplate className='eclipse-jkube-introduction-index' title={TITLE} subtitle={SUBTITLE} />
  </div>
);

export default slideControls(EclipseJKubeIntroduction, '/', '/presentations/eclipse-jkube-introduction/slide1');
