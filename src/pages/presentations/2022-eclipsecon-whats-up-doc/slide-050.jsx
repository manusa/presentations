import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {SlideTemplate} from './components/slide-template';
import {SLUG} from './index';

const Slide050 = ({}) => {
  return (
    <SlideTemplate slide={5} title="Eclipse JKube - Remote Development">
      <ul>
        <li>
          🧑‍💻 Local development in Kubernetes
          <ul>
            <li>Run and debug code in your <strong>local</strong> machine</li>
            <li>While connected/exposed to the rest of the cluster services</li>
            <li>Connect your local toolset to the cluster services</li>
          </ul>
        </li>
        <li>➰ Boosts inner-loop developer experience</li>
        <li>🔧 <strong>No</strong> tools required</li>
        <li>🔑 <strong>No</strong> need for special permissions cluster/local</li>
      </ul>
    </SlideTemplate>
  );
};

export default slideControls(Slide050, `/presentations/${SLUG}/slide-040`, `/presentations/${SLUG}/slide-060`, 1);
