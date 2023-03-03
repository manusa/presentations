import React from 'react';
import {Avatar, JKubeLogo} from '../';


export const InteriorSlideTemplate = ({
  classNamePrefix,
  titleIcon = <JKubeLogo iconColor='#ffffffa6' textColor='#ffffffa6' style={{height: '75%'}}/>,
  footerIcon = <Avatar backgroundColor='none' hatColor='none' hatbandColor='none' style={{width: '5rem'}} />,
  slide = 0, title = '', children
}) => {
  const calcClassName = (element = '') => (`${classNamePrefix}-slide${element ? `__${element}` : ''}`);
  return (
    <div className={calcClassName()}>
      <div className={calcClassName('header')}>
        <div className='title'>
          {title}
        </div>
        {titleIcon}
      </div>
      <div className={calcClassName('content')}>
        {children}
      </div>
      <div className={calcClassName('footer')}>
        {footerIcon}
        <div className='page-number'>
          {slide}
        </div>
      </div>
    </div>
  );
}
