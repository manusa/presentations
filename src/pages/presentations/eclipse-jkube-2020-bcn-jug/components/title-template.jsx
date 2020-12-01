import React from 'react';
import logo from '../assets/bcn-jug-logo.png';

import '../styles/title-template.scss';

const calcClassName = (element = '') => (`eclipse-jkube-2020-bcn-jug-title${element ? `__${element}` : ''}`);

const TitleTemplate = ({className, title, subtitle = '', children}) => (
  <div className={`${calcClassName()} ${className}`}>
    <div className={`${calcClassName('content')}`}>
      <div className='logo'>
        <img src={logo} />
      </div>
      <div className='title-band'>
        <h1 className='title'>{title}</h1>
        <h2 className='subtitle'>{subtitle}</h2>
      </div>
      {children}
    </div>
  </div>
);

export default TitleTemplate;
