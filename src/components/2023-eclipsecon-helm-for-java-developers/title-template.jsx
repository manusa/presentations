import React from 'react';
import {TitleSlideTemplate} from '../';
import {CLASS_NAME} from './';
import {EclipseCon2023} from './eclipsecon-2023';

import './styles/title-template.scss';

export const TitleTemplate = ({...props}) =>
  <TitleSlideTemplate
    classNamePrefix={CLASS_NAME}
    logoContent={<EclipseCon2023 style={{height: '50%'}} className='eclipsecon-logo' alt='An image of the EclipseCon logo' />}
    {...props}
  />;
