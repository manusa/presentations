import React from 'react';
import {CLASS_NAME} from '../';
import logo from '../assets/duke-kubernetes-surf-sc.png';

import '../styles/slide-template.scss';

const calcClassName = (element = '') => (`${CLASS_NAME}-slide${element ? `__${element}` : ''}`);

const SlideTemplate = ({slide = 0, title = '', children}) => (
  <div className={calcClassName()}>
    <div className={calcClassName('header')}>
      <div className='title'>
        {title}
      </div>
      <img className='duke-logo' src={logo} alt='An image of the Duke riding a Kubernetes surfboard' />
    </div>
    <div className={calcClassName('content')}>
      {children}
    </div>
    <div className={calcClassName('footer')}>
      <div className='page-number'>
        {slide}
      </div>
    </div>
  </div>
);

export default SlideTemplate;
