import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {JKubeLogoSquare} from '../../../components';
import {LooneyTunes} from '../2022-eclipsecon-whats-up-doc/components/looney-tunes';
import {SLUG, CLASS_NAME} from './index';

import './styles/index.scss';

const WhiteLogo = () => <JKubeLogoSquare fillColor='#FFFFFF' />;

const Slide090 = () => (
    <LooneyTunes
      className={`${CLASS_NAME}`} title='ecliPse JKUbE' subtitle={`"That's all Folks!"`}
      Icon={WhiteLogo}
    />
);

export default slideControls(Slide090, `/presentations/${SLUG}/slide-080`, `/presentations/${SLUG}`);
