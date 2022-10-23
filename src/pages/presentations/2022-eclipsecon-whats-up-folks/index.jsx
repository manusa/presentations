import React from 'react';
import {Helmet} from 'react-helmet';
import slideControls from '../../../components/slide-controls/slide-controls';
import {LooneyTunes} from './components/looney-tunes.jsx';

import './styles/index.scss';

export const SLUG = '2022-eclipsecon-whats-up-folks';
export const CLASS_NAME = 'eclipsecon-2022';
const TITLE = 'Eclipse JKube - What\'s up, Doc?';

const EclipseJKubeIntroduction = () => (
  <div className={CLASS_NAME}>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <LooneyTunes
      className={`${CLASS_NAME}-index`}
      title='ecliPse JKUbE' subtitle={`"What's up Doc?"`} producer='a Marc Nuri cartoon' />
  </div>
);

export default slideControls(EclipseJKubeIntroduction, '/', `/presentations/${SLUG}/slide-010`);
