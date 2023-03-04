import React from 'react';
import {Avatar} from '../';

export const TitleSlideTemplate = ({
  classNamePrefix,
  title, subtitle = '', titleBandVisible= true,
  className = '',
  logoContent = <Avatar backgroundColor='none' hatColor='none' hatbandColor='none' style={{height: '50%'}} />,
  children
}) => {
  const calcClassName = (element = '') => (`${classNamePrefix}-title${element ? `__${element}` : ''}`);
  return (
    <div className={`${calcClassName()} ${className}`}>
      <div className={`${calcClassName('content')}`}>
        <div className='logo'>
          {logoContent}
        </div>
        {titleBandVisible &&
          <div className='title-band'>
            <h1 className='title'>{title}</h1>
            <h2 className='subtitle'>{subtitle}</h2>
          </div>
        }
        {children}
      </div>
    </div>
  );
};
