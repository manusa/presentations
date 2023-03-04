import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {SlideTemplate} from './components/slide-template';
import {NorthwindDiagram} from './components/northwind-diagram';
import {SLUG} from './index';

import './styles/slide-northwind-diagram.scss';

const Slide080 = () => {
  return (
    <SlideTemplate slide={8} title='Demo: Sailing into the North Wind' >
      <div className='northwind'>
        <NorthwindDiagram />
      </div>
    </SlideTemplate>
  );
};

export default slideControls(Slide080, `/presentations/${SLUG}/slide-070`, `/presentations/${SLUG}/slide-090`, 1);
