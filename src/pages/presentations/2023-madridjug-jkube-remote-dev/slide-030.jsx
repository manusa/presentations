import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {SlideTemplate} from './components/slide-template';
import {InnerOuterLoop} from './components/inner-outer-loop';
import {SLUG} from './index';

import './styles/slide-inner-outer-loop.scss';

const Slide030 = () => (
  <SlideTemplate slide={3} title='Inner Loop vs. Outer Loop'>
    <div className='inner-outer-loop'>
      <div className='inner-outer-loop__content'>
        <ul>
          <li>
            Inner Loop
            <ul>
              <li>Developer's cycle before application is shared</li>
              <li>Feedback loop <strong>must</strong> be fast</li>
            </ul>
          </li>
          <li>
            Outer Loop
            <ul>
              <li>After commit-push</li>
              <li>CI/CD - <strong>must</strong> be automated</li>
            </ul>
          </li>
          <li>
            Cloud/K8s very challenging
          </li>
        </ul>
      </div>
      <div className='inner-outer-loop__diagram'>
        <InnerOuterLoop
          innerLoopColor='#2285f7'
          outerLoopColor='#2285f7'
          pushCommitColor='#f63440'
        />
      </div>
    </div>
  </SlideTemplate>
);

export default slideControls(Slide030, `/presentations/${SLUG}/slide-020`, `/presentations/${SLUG}/slide-040`);
