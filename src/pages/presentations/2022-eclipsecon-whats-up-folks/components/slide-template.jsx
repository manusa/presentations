import React from 'react';
import {JKubeLogo} from '../../../../components';
import {CLASS_NAME} from '../';
import logo from '../assets/eclipsecon2022-white.png';

import '../styles/slide-template.scss';

const calcClassName = (element = '') => (`${CLASS_NAME}-slide${element ? `__${element}` : ''}`);

export const SlideTemplate = ({slide = 0, title = '', children}) => (
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

export default () => {};
