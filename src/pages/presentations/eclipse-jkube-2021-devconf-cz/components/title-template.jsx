import React from 'react';
import DevconfCzLogo from './devconf-cz-logo';

import '../styles/title-template.scss';

const calcClassName = (element = '') => (`eclipse-jkube-2021-devconf-cz-title${element ? `__${element}` : ''}`);

const TitleTemplate = ({className, title, subtitle = '', children}) => (
  <div className={`${calcClassName()} ${className}`}>
    <div className={`${calcClassName('content')}`}>
      <DevconfCzLogo className='logo' />
      <div className='title-band'>
        <h1 className='title'>{title}</h1>
        <h2 className='subtitle'>{subtitle}</h2>
      </div>
      {children}
    </div>
  </div>
);

export default TitleTemplate;
