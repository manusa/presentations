import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {SlideTemplate} from './components/slide-template';
import {SLUG} from './index';

const Slide040 = ({}) => {
  return (
    <SlideTemplate slide={4} title="What's new?">
      <ul>
        <li>Gradle Plugins GA</li>
        <li>UX and overall stability improvements</li>
        <li>Fragments for multiple environments</li>
        <li>Support for Apple M1</li>
        <li>Support for JakartaEE</li>
        <li>Startup probes</li>
        <li><strong>Remote development</strong></li>
      </ul>
    </SlideTemplate>
  );
};

export default slideControls(Slide040, `/presentations/${SLUG}/slide-030`, `/presentations/${SLUG}/slide-050`, 1);
