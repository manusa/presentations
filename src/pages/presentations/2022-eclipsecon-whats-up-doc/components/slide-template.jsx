import React from 'react';
import {InteriorSlideTemplate} from '../../../../components';
import {CLASS_NAME} from '../';
import logo from '../assets/eclipsecon2022-white.png';

import '../styles/slide-template.scss';

export const SlideTemplate = ({className = '', ...props}) =>
  <InteriorSlideTemplate
    className={CLASS_NAME}
    footerIcon={<img src={logo} alt='An image of the EclipseCon logo' />}
    {...props}
  />;

export default () => {};
