import React from 'react';
import JKubeLogo from './jkube-logo';
import DevconfCzLogo from './devconf-cz-logo';
import devConfCzLogo from '../assets/devconf-icon.svg';

import '../styles/slide-template.scss';

const calcClassName = (element = '') => (`eclipse-jkube-2021-devconf-cz-slide${element ? `__${element}` : ''}`);

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
      <DevconfCzLogo className='devconf-cz-logo' />
      <div className='page-number'>
        {slide}
      </div>
      <JKubeLogo className='jkube-logo' />
    </div>
  </div>
);

export default SlideTemplate;
