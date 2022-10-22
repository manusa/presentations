import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';
import {SLUG} from './index';

const Slide020 = () => (
  <SlideTemplate slide={2} title='Agenda'>
    <ul>
      <li>What is Eclipse JKube?</li>
      <li>What's new?</li>
      <li>Remote Development</li>
      <li>Demo</li>
      <li>Q&A</li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide020, `/presentations/${SLUG}/slide-010`, `/presentations/${SLUG}/slide-030`);
