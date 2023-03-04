import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {SlideTemplate} from './components/slide-template';
import {SLUG} from './index';

import './styles/slide-future-steps.scss';

const Slide070 = () => {
  return (
    <SlideTemplate slide={7} title='Future steps'>
      <div className='future-steps'>
        <div className='future-steps__icon'>
          <i className='fas fa-rocket' />
        </div>
        <div className='future-steps__steps'>
          <div className='future-steps__step'>
            <h3>Integration with other tooling</h3>
            <ul>
              <li>IDE plugins</li>
              <li>CLI tools</li>
              <li>Move to Fabric8 Kubernetes Client?</li>
            </ul>
          </div>
          <div className='future-steps__step'>
            <h3>Automatic port detection</h3>
          </div>
          <div className='future-steps__step'>
            <h3>Encapsulate run</h3>
          </div>
          <div className='future-steps__step'>
            <h3>Propagation of secrets and environment</h3>
          </div>
        </div>
      </div>
    </SlideTemplate>
  );
};

export default slideControls(Slide070, `/presentations/${SLUG}/slide-060`, `/presentations/${SLUG}/slide-080`);
