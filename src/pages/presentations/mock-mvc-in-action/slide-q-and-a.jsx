import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import './slide-q-and-a.scss';

const SlideQAndA = () => (
  <div className={'slide slide-q-and-a'}>
    <div className={'content'}>
      Q & A
    </div>
  </div>
);

export default slideControls(SlideQAndA, '/presentations/mock-mvc-in-action/slide7', '/presentations/mock-mvc-in-action/slide-summary');
