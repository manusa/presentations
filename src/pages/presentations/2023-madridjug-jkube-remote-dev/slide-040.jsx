import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {SlideTemplate} from './components/slide-template';
import {SLUG} from './index';

import './styles/slide-remote-dev.scss';

const Slide040 = () => {
  return (
    <SlideTemplate slide={4} title="Eclipse JKube - Remote Development">
      <div className='remote-dev'>
        <div className='remote-dev__grid'>
          <div className='remote-dev__grid-item'>
            <div className='remote-dev__grid-item-icon'><i className='fas fa-laptop-code'/></div>
            <div className='remote-dev__grid-item-title'>Local development in K8s</div>
          </div>
          <div className='remote-dev__grid-item'>
            <div className='remote-dev__grid-item-icon'><i className='fas fa-sync-alt'/></div>
            <div className='remote-dev__grid-item-title'>Boosts inner-loop developer experience</div>
          </div>
          <div className='remote-dev__grid-item'>
            <div className='remote-dev__grid-item-icon'><i className='fas fa-wrench'/></div>
            <div className='remote-dev__grid-item-title'>No tools required</div>
          </div>
          <div className='remote-dev__grid-item'>
            <div className='remote-dev__grid-item-icon'><i className='fas fa-key'/></div>
            <div className='remote-dev__grid-item-title'>No need for special permissions</div>
          </div>
        </div>
      </div>
    </SlideTemplate>
  );
};

export default slideControls(Slide040, `/presentations/${SLUG}/slide-030`, `/presentations/${SLUG}/slide-050`, 1);
