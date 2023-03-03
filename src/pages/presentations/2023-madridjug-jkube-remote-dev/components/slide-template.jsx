import React from 'react';
import {InteriorSlideTemplate, MadridJugLogo} from '../../../../components';
import {CLASS_NAME} from '../';

import '../styles/slide-template.scss';

export const SlideTemplate = ({className = '', ...props}) =>
  <InteriorSlideTemplate
    classNamePrefix={CLASS_NAME}
    footerIcon={<MadridJugLogo gray='#FAFAFA' fruitColor='#082941' style={{width: '8rem'}} />}
    {...props}
  />;

export default () => {};
