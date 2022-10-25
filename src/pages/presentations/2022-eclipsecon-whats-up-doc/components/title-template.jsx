import React from 'react';
import {CLASS_NAME} from '../';
import logo from '../assets/eclipsecon2022-white.png';
import '../styles/title-template.scss';

const calcClassName = (element = '') => (`${CLASS_NAME}-title${element ? `__${element}` : ''}`);

export const TitleTemplate = ({className, title, subtitle = '', children}) => (
  <div className={`${calcClassName()} ${className}`}>
    <div className={`${calcClassName('content')}`}>
      <div className='logo'>
        <img src={logo} alt='An image of the EclipseCon logo' />
      </div>
      <div className='title-band'>
        <h1 className='title'>{title}</h1>
        <h2 className='subtitle'>{subtitle}</h2>
      </div>
      {children}
    </div>
  </div>
);

export default () => {};
