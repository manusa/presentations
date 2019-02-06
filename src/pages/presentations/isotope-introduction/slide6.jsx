import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import './slide6.scss';

const Slide6 = () => (
  <div className={'slide slide6'}>
    <div className={'title'}>Scaling Isotope Mail</div>
    <div className={'content'}>
    </div>
  </div>
);

export default slideControls(Slide6, '/presentations/isotope-introduction/slide5', '/presentations/isotope-introduction/slide-q-and-a');
