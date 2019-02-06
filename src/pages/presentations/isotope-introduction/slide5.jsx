import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import html5Logo from './assets/html5.png';
import reduxLogo from './assets/redux.png';
import envelopeIcon from './assets/envelope.png';
import './slide5.scss';

const Slide5 = () => (
  <div className={'slide slide5'}>
    <div className={'title'}>Isotope storage model</div>
    <div className={'content'}>
      <div className={'group browser'}>
        <div className={'group-title'}>Browser</div>
        <div className={'box indexed-db'}>
          <div className={'encrypted'}></div>
          <img src={html5Logo} />
          IndexedDB
        </div>
        <div className={'box redux'}>
          <img src={reduxLogo} />
          Redux
        </div>
      </div>
      <div className={'group backend'}>
        <div className={'group-title'}>Back-end / Server-side</div>
        <div className={'box imap-server'}>
          <img src={envelopeIcon} />
          IMAP Server
        </div>
      </div>
    </div>
  </div>
);

export default slideControls(Slide5, '/presentations/isotope-introduction/slide4', '/presentations/isotope-introduction/slide6');
