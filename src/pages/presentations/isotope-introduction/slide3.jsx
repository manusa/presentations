import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import './slide3.scss';

const Slide3 = () => (
  <div className={'slide slide3'}>
    <div className={'title'}>Isotope Mail in Action!</div>
    <div className={'content'}>
      <a href={'https://isotope.marcnuri.com/login?serverHost=imap-mail.outlook.com&user=isotope-demo@outlook.com&smtpHost=smtp-mail.outlook.com&smtpSsl=false&smtpPort=587'}
        target={'_blankIsotopeDemo'}>Let's play!</a>
    </div>
  </div>
);

export default slideControls(Slide3, '/presentations/isotope-introduction/slide2', '/');
