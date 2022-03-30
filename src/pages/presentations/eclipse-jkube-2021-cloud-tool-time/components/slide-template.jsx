import React from 'react';
import {JKubeLogo} from '../../../../components';
import ECDToolsLogo from './ecdtools-logo';

import '../styles/slide-template.scss';

const calcClassName = (element = '') => (`eclipse-jkube-2021-cloud-tool-time-slide${element ? `__${element}` : ''}`);

const SlideTemplate = ({slide = 0, title = '', children}) => (
  <div className={calcClassName()}>
    <div className={calcClassName('header')}>
      <div className='title'>
        {title}
      </div>
    </div>
    <div className={calcClassName('content')}>
      {children}
    </div>
    <div className={calcClassName('footer')}>
      <ECDToolsLogo className='cloud-tool-time-logo' />
      <div className='page-number'>
        {slide}
      </div>
      <JKubeLogo className='jkube-logo' />
    </div>
  </div>
);

export default SlideTemplate;
