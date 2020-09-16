import React from 'react';
import eclipseLogo from './assets/eclipsecon.png';
import JKubeLogo from './jkube-logo';
import './slide-template.scss';

const className = (element = '') => (`eclipse-jkube-introduction-slide${element ? `__${element}` : ''}`);

const SlideTemplate = ({slide = 0, title = '', children}) => (
  <div className={className()}>
    <div className={className('header')}>
      <div className='title'>
        {title}
      </div>
      <JKubeLogo className='jkube-logo' />
    </div>
    <div className={className('content')}>
      {children}
    </div>
    <div className={className('footer')}>
      <img src={eclipseLogo} />
    </div>
  </div>
);

export default SlideTemplate;
