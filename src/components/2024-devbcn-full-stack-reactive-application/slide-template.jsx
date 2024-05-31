import React from 'react';
import {InteriorSlideTemplate} from '../';
import {CLASS_NAME} from './';
import {DevBcn} from './dev-bcn';

import './styles/slide-template.scss';

export const SlideTemplate = ({className = '', ...props}) => {
  return (
    <InteriorSlideTemplate
      className={CLASS_NAME}
      titleIcon={<DevBcn className='devbcn-logo' alt='An image of the DevBcn logo'/>}
      footerIcon={<></>}
      {...props}
    />
  );
};
