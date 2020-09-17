import React from 'react';
import logo from '../assets/eclipsecon.png';
import '../styles/title-template.scss';

const calcClassName = (element = '') => (`eclipse-jkube-introduction-title${element ? `__${element}` : ''}`);

const TitleTemplate = ({className, title, subtitle = ''}) => (
  <div className={`${calcClassName()} ${className}`}>
    <div className={`${calcClassName('content')}`}>
      <div className='logo'>
        <img src={logo} />
      </div>
      <div className='title-band'>
        <h1 className='title'>{title}</h1>
        <h2 className='subtitle'>{subtitle}</h2>
      </div>
    </div>
  </div>
);

export default TitleTemplate;
