import React from 'react';
import eclipseLogo from '../assets/eclipsecon.png';
import JKubeLogo from './jkube-logo';
import '../styles/slide-template.scss';

const calcClassName = (element = '') => (`eclipse-jkube-introduction-slide${element ? `__${element}` : ''}`);

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
      <img src={eclipseLogo} />
      <div className='page-number'>
        {slide}
      </div>
    </div>
  </div>
);

export default SlideTemplate;
