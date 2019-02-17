import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import './slide3.scss';

const Slide3 = () => (
  <div className={'slide slide3'}>
    <div className={'beer-wrapper'}>
      <div className={'title'}>Beer CRUD</div>
      <div className={'ostia-beer'}></div>
    </div>
  </div>
);

export default slideControls(Slide3, '/presentations/mock-mvc-in-action/slide2', '/presentations/mock-mvc-in-action/slide4');
