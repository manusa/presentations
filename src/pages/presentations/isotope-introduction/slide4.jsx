import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import './slide4.scss';

const Slide4 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <div className={'slide slide4'}>
      <div className={`${classNameVisibleFrom(1)} title`}>Back-end Architecture</div>
      <div className={`${classNameVisibleFrom(1)} content`}>
        <ul>
          <li>Spring Boot</li>
          <li>Spring HATEOAS</li>
          <li>Spring Webflux -> Reactive endpoints -> Server Sent Events</li>
          <li>JavaMail</li>
          <li>JUnit + Mockito + Powermock</li>
        </ul>
      </div>
      <div className={`${classNameVisibleFrom(2)} title`}>Front-end Architecture</div>
      <div className={`${classNameVisibleFrom(2)} content`}>
        <ul className={'columns-2'}>
          <li>Redux</li>
          <li>i18next</li>
          <li>Web workers</li>
          <li>SJCL (Stanford Javascript Crypto Library)</li>
          <li>IndexedDB + IDB</li>
          <li>TinyMCE</li>
          <li>DOMPurify</li>
          <li>Jest + Enzyme</li>
          <li>HTML5 (Drag and Drop, Notifications...)</li>
        </ul>
      </div>
    </div>
  );
};

export default slideControls(Slide4, '/presentations/isotope-introduction/slide3', '/presentations/isotope-introduction/slide5', 2);
