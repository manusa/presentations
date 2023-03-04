import React from 'react';
import {CLASS_NAME} from '../';
import {MadridJugLogo, TitleSlideTemplate} from '../../../../components';

import '../styles/title-template.scss';

export const TitleTemplate = ({...props}) =>
  <TitleSlideTemplate
    classNamePrefix={CLASS_NAME}
    logoContent={<MadridJugLogo gray='#FAFAFA' fruitColor='#082941' style={{height: '60%'}} />}
    {...props}
  />;

export default () => {};
