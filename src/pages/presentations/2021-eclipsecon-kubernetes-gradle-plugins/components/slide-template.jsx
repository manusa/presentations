import React from 'react';
import {JKubeLogo} from '../../../../components';
import logo from '../assets/eclipsecon-white.png';

import '../styles/slide-template.scss';

const calcClassName = (element = '') => (`eclipsecon-2021-slide${element ? `__${element}` : ''}`);

const SlideTemplate = ({slide = 0, title = '', children}) => (
  <div className={calcClassName()}>
    <div className={calcClassName('header')}>
      <div className='title'>
        {title}
      </div>
      <JKubeLogo className='jkube-logo' />
    </div>
    <div className={calcClassName('content')}>
      {children}
    </div>
    <div className={calcClassName('footer')}>
      <img src={logo} alt='An image of the EclipseCon logo' />
      <div className='page-number'>
        {slide}
      </div>
    </div>
  </div>
);

export default SlideTemplate;
