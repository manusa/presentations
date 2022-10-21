import React from 'react';
import {Helmet} from 'react-helmet';
import slideControls from '../../../components/slide-controls/slide-controls';
import {LooneyTunes} from './components/LooneyTunes';

import './styles/index.scss';

export const SLUG = '2022-eclipsecon-whats-up-folks';
export const CLASS_NAME = 'eclipsecon-2022';

const EclipseJKubeIntroduction = () => (
  <div className={CLASS_NAME}>
    <LooneyTunes
      className={`${CLASS_NAME}-index`} title='ecliPse JKUbE' subtitle={`"That's all Folks!"`}
    />
  </div>
);

export default slideControls(EclipseJKubeIntroduction, `/presentations/${SLUG}/slide-010`, `/presentations/${SLUG}`);
