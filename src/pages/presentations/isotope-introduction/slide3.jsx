import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import '../../../styles/main.scss';

const Slide3 = () => (
  <div className={'slide'}>
    <div className={'title'}>Isotope Mail in Action!</div>
    <a href={'https://isotope.marcnuri.com'} target={'_blank'}>Isotope Mail</a>
  </div>
);

export default slideControls(Slide3, '/presentations/isotope-introduction/slide2', '/');
