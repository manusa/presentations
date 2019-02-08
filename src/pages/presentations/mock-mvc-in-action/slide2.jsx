import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import './slide2.scss';

const Slide2 = () => (
  <div className={'slide slide2'}>
    <div className={'pyramid-wrapper'}>
      <div className={'title'}>Pyramid of testing and MockMVC</div>
      <div className={'pyramid-of-testing'}></div>
    </div>
  </div>
);

export default slideControls(Slide2, '/presentations/mock-mvc-in-action/slide1', '/presentations/mock-mvc-in-action/slide3');
