import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {SlideTemplate} from './components/slide-template';
import {SLUG} from './index';

const Slide020 = () => (
  <SlideTemplate slide={2} title='Agenda'>
    <ul>
      <li>What is Eclipse JKube?</li>
      <li>JKube Remote Development</li>
      <li>Demo</li>
      <li>Future steps</li>
      <li>Q&A</li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide020, `/presentations/${SLUG}/slide-010`, `/presentations/${SLUG}/slide-030`);
