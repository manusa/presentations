import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {JKubeLogoSquare} from '../../../components/icons';
import {LooneyTunes} from './components/LooneyTunes';

import './styles/index.scss';

export const SLUG = '2022-eclipsecon-whats-up-folks';
export const CLASS_NAME = 'eclipsecon-2022';

const EclipseJKubeIntroduction = () => (
    <LooneyTunes
      className={`${CLASS_NAME}`} title='ecliPse JKUbE' subtitle={`"That's all Folks!"`}
      Icon={JKubeLogoSquare} />
);

export default slideControls(EclipseJKubeIntroduction, `/presentations/${SLUG}/slide-010`, `/presentations/${SLUG}`);
