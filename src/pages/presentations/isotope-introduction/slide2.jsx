import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import './slide2.scss';
import '../../../styles/main.scss';

const Slide2 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <div className={'slide slide2'}>
      <div className={'title'}>Architecture</div>
      <div className={`${classNameVisibleFrom(4)} multi-box`}>
        <div className={'box inline'}>IMAP Server</div>
        <div className={'box inline'}>SMTP Server</div>
      </div>
      <div className={`${classNameVisibleFrom(3)} box red`}>Java Mail</div>
      <div className={`${classNameVisibleFrom(3)} box green`}>Spring</div>
      <div className={`${classNameVisibleFrom(2)} box blue`}>Reverse Proxy [Traefik]</div>
      <div className={`${classNameVisibleFrom(5)} box`}>ReactJS</div>
    </div>
  );
};

export default slideControls(Slide2, '/presentations/isotope-introduction/slide1',
  '/presentations/isotope-introduction/slide3', 5);
