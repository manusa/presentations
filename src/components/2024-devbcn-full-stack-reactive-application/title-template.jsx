import React from 'react';
import {TitleSlideTemplate} from '../';
import {CLASS_NAME, DevBcn} from './';

import './styles/title-template.scss';

export const TitleTemplate = ({...props}) =>
  <TitleSlideTemplate
    classNamePrefix={CLASS_NAME}
    logoContent={<DevBcn style={{height: '50%'}} className='eclipsecon-logo' alt='An image of the DevBcn logo' />}
    {...props}
  />;
