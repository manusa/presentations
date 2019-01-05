import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';

const Slide1 = () => (
  <div>This is the first slide</div>
);

export default slideControls(Slide1, '/presentations/isotope-introduction', '/');
