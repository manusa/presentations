import React from 'react';
import {CLASS_NAME} from '../';
import logo from '../assets/duke-kubernetes-surf-sc.png';
import '../styles/title-template.scss';

const calcClassName = (element = '') => (`${CLASS_NAME}-title${element ? `__${element}` : ''}`);

const TitleTemplate = ({className, title, subtitle = '', children}) => (
  <div className={`${calcClassName()} ${className}`}>
    <div className={`${calcClassName('content')}`}>
      <div className='logo'>
        <img src={logo} alt='An image of the Duke riding a Kubernetes surfboard' />
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
