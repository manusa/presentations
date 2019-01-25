import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import './slide1.scss';
import '../../../styles/main.scss';

// eslint-disable-next-line no-confusing-arrow
const visibilityClassForStep = currentStep => step =>
  ((currentStep < step) ? 'hidden' : 'visible');

const Slide1 = ({currentStep}) => {
  const classNameVisibleFrom = visibilityClassForStep(currentStep);
  return (
    <div className={'slide'}>
      <div className={'title'}>Why?</div>
      <ul>
        <li className={classNameVisibleFrom(2)}>Big Brother</li>
        <li className={classNameVisibleFrom(3)}>Alternatives lack features</li>
        <li className={classNameVisibleFrom(4)}>Personal interest</li>
      </ul>
    </div>
  );
};

export default slideControls(Slide1, '/presentations/isotope-introduction', '/', 4);
