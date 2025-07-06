import React from 'react';
import {Helmet} from 'react-helmet';
import {DevBcn2025, TitleSlideTemplate} from '../';
import {CLASS_NAME, DevBcn} from './';

import './styles/title-template.scss';

export const TitleTemplate = ({children, ...props}) =>
  <TitleSlideTemplate
    classNamePrefix={CLASS_NAME}
    logoContent={<DevBcn className='devbcn-logo' alt='An image of the DevBcn logo' />}
    {...props}
  >
    <Helmet
      bodyAttributes={{'class': DevBcn2025.CLASS_NAME}}
    >
      <title>{DevBcn2025.TITLE}</title>
    </Helmet>
    {children}
  </TitleSlideTemplate>;
