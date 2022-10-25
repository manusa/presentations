import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {JKubeLogoSquare} from '../../../components';
import {LooneyTunes} from './components/looney-tunes';
import {SLUG, CLASS_NAME} from './index';

import './styles/index.scss';

const WhiteLogo = () => <JKubeLogoSquare fillColor='#FFFFFF' />;

const EclipseJKubeIntroduction = () => (
    <LooneyTunes
      className={`${CLASS_NAME}`} title='ecliPse JKUbE' subtitle={`"That's all Folks!"`}
      Icon={WhiteLogo}
    />
);

export default slideControls(EclipseJKubeIntroduction, `/presentations/${SLUG}/slide-090`, `/presentations/${SLUG}`);
