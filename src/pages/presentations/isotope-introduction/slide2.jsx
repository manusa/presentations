import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import javaLogo from './assets/java.png';
import springLogo from './assets/spring.png';
import traefikLogo from './assets/traefik.png';
import reactLogo from './assets/react-hexagon.png';
import './slide2.scss';

const Slide2 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <div className={'slide slide2'}>
      <div className={'title'}>Architecture (High level)</div>
      <div className={`${classNameVisibleFrom(4)} row`}>
        <div className={'row-title'}>Mail Server</div>
        <div className={'multi-box'}>
          <div className={'box blue2'}>IMAP Server</div>
          <div className={'box yellow'}>SMTP Server</div>
        </div>
      </div>
      <div className={'spacer'}></div>
      <div className={`${classNameVisibleFrom(3)} row`}>
        <div className={'row-title'}>Back-end</div>
        <div className={'box red'}>
          <img src={javaLogo} />
          Java Mail
        </div>
      </div>
      <div className={`${classNameVisibleFrom(3)} row`}>
        <div className={'row-title'}></div>
        <div className={'box green'}>
          <img src={springLogo} />
          Spring
        </div>
      </div>
      <div className={'spacer'}></div>
      <div className={`${classNameVisibleFrom(2)} row`}>
        <div className={'row-title'}>API Gateway</div>
        <div className={'box blue'}>
          <img src={traefikLogo} />
          Reverse Proxy [Traefik]
        </div>
      </div>
      <div className={'spacer'}></div>
      <div className={`${classNameVisibleFrom(5)} row`}>
        <div className={'row-title'}>Front-end</div>
        <div className={'box purple'}>
          <img src={reactLogo} />
          ReactJS
        </div>
      </div>
    </div>
  );
};

export default slideControls(Slide2, '/presentations/isotope-introduction/slide1',
  '/presentations/isotope-introduction/slide3', 5);
