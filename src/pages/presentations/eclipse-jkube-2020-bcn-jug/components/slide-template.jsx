import React from 'react';
import {JKubeLogo} from '../../../../components';
import bcnJugLogo from '../assets/bcn-jug-logo.png';

import '../styles/slide-template.scss';

const calcClassName = (element = '') => (`eclipse-jkube-2020-bcn-jug-slide${element ? `__${element}` : ''}`);

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
      <img src={bcnJugLogo} />
      <div className='page-number'>
        {slide}
      </div>
    </div>
  </div>
);

export default SlideTemplate;
