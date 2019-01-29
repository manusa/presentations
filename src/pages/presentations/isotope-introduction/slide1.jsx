import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import webMailTrend from './assets/webmail-trend.png';
import './slide1.scss';


const Slide1 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <div className={'slide slide1'}>
      <div className={'title'}>Why?</div>
      <div className={'webmail-trend'}><img src={webMailTrend}/></div>
      <ul className={'content'}>
        <li className={classNameVisibleFrom(2)}>
          Big Brother
          <ul>
            <li>Privacy</li>
            <li className={classNameVisibleFrom(3)}>Missing features</li>
          </ul>
        </li>
        <li className={classNameVisibleFrom(4)}>Alternatives lack features</li>
        <li className={classNameVisibleFrom(5)}>Personal interest</li>
      </ul>
    </div>
  );
};

export default slideControls(Slide1, '/presentations/isotope-introduction', '/presentations/isotope-introduction/slide2', 5);
