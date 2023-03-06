import React from 'react';
import adChoicesLogo from './adchoices-logo.png';
import bookCover from './full-stack-quarkus-and-react.png';

import '../../styles/packt/ads.scss';

export const FullstackQuarkusReactAd = ({
  className = ''
}) => (
  <div className={`fullstack-quarkus-and-react-ad ${className}`}>
    <div className='fullstack-quarkus-and-react-ad__logo'>
      <img src={adChoicesLogo} alt='Adchoices logo' />
    </div>
    <div className='fullstack-quarkus-and-react-ad__image'>
      <img src={bookCover} alt='Full Stack Quarkus and React book cover' />
    </div>
    <div className='fullstack-quarkus-and-react-ad__content'>
      <div className='fullstack-quarkus-and-react-ad__link-container'>
        <a className='fullstack-quarkus-and-react-ad__link' href='https://marcnuri.com/book'>marcnuri.com/book</a>
      </div>
      <div className='fullstack-quarkus-and-react-ad__message'>
        Buy! Buy! Buy! Buy! Buy! Buy! Buy!!!!!!!!!
      </div>
    </div>
  </div>
);
