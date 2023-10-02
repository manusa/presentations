import React from 'react';
import {InteriorSlideTemplate} from '../';
import {CLASS_NAME} from './';
import {EclipseCon2023} from './eclipsecon-2023';

import './styles/slide-template.scss';

export const SlideTemplate = ({className = '', ...props}) =>
  <InteriorSlideTemplate
    className={CLASS_NAME}
    footerIcon={<EclipseCon2023 className='eclipsecon-logo' alt='An image of the EclipseCon logo' />}
    {...props}
  />;

export default () => {};
