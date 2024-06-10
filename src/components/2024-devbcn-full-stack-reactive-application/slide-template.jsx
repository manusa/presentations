import React from 'react';
import {Helmet} from 'react-helmet';
import {DevBcn2024, InteriorSlideTemplate} from '../';
import {CLASS_NAME} from './';
import {DevBcn} from './dev-bcn';

import './styles/slide-template.scss';

export const SlideTemplate = ({className = '', children, ...props}) => {
  return (
    <InteriorSlideTemplate
      className={CLASS_NAME}
      titleIcon={<DevBcn className='devbcn-logo' alt='An image of the DevBcn logo'/>}
      footerIcon={<></>}
      {...props}
    >
      <Helmet
        bodyAttributes={{'class': DevBcn2024.CLASS_NAME}}
      >
        <title>{DevBcn2024.TITLE}</title>
      </Helmet>
      {children}
    </InteriorSlideTemplate>
  );
};
