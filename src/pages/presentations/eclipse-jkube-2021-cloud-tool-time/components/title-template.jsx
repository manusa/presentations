import React from 'react';
import ECDToolsLogo from './ecdtools-logo';

import '../styles/title-template.scss';

const calcClassName = (element = '') => (`eclipse-jkube-2021-cloud-tool-time-title${element ? `__${element}` : ''}`);

const TitleTemplate = ({className, title, subtitle = '', children}) => (
  <div className={`${calcClassName()} ${className}`}>
    <div className={`${calcClassName('content')}`}>
      <div className='logo__container'>
        <ECDToolsLogo className='logo__image' />
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
