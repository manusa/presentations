import React from 'react';
import {Helmet} from 'react-helmet';
import slideControls from '../../../components/slide-controls/slide-controls';

import './styles/index.scss';
import {TitleTemplate} from './components/title-template';

export const SLUG = '2023-madridjug-jkube-remote-dev';
export const CLASS_NAME = 'madrid-jug-2023';
const TITLE = 'Desarrollo local de aplicaciones Java en Kubernetes';

const EclipseJKubeIntroduction = () => (
  <div className={CLASS_NAME}>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <TitleTemplate
      title={TITLE}
      subtitle='Marc Nuri'
    />
  </div>
);

export default slideControls(EclipseJKubeIntroduction, '/', `/presentations/${SLUG}/slide-010`);
