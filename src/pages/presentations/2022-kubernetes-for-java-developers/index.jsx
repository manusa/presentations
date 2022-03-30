import React from 'react';
import {Helmet} from 'react-helmet';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';
import './styles/index.scss';

export const CLASS_NAME = 'kubernetes-java-developers-2022';
const TITLE = 'Kubernetes for Java developers workshop';
const SUBTITLE = 'Marc Nuri';

const KubernetesForJavaDevelopers = () => (
  <div className={CLASS_NAME}>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <TitleTemplate className={`${CLASS_NAME}-index`} title={TITLE} subtitle={SUBTITLE} />
  </div>
);

export default slideControls(KubernetesForJavaDevelopers, '/', '/presentations/2022-kubernetes-for-java-developers/slide-010');
