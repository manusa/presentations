import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';

const Slide1 = ({currentStep}) => (
  <div>This is the first slide at step {currentStep}</div>
);

export default slideControls(Slide1, '/presentations/isotope-introduction', '/', 3);
