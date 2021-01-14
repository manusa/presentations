import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';

import './styles/slide-what-is-jkube.scss';

const Slide060 = () => (
  <SlideTemplate slide={6} title='What is Eclipse JKube? (2)'>
    <ul className='what-is-jkube'>
      <li>
        Support for multiple frameworks and technologies
      </li>
      <li>
        3 configuration modes
        <ul>
          <li>
            <strong>Zero Config</strong>, Opinionated defaults
            <ol>
              <li>Project Analysis and cluster detection</li>
              <li>Inferred image configuration</li>
              <li>Inferred cluster manifests </li>
            </ol>
          </li>
          <li><strong>XML</strong> plugin configuration</li>
          <li><strong>Resource fragments</strong> enrich missing parts of opinionated defaults</li>
        </ul>
      </li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide060, '/presentations/eclipse-jkube-2021-devconf-cz/slide-050', '/presentations/eclipse-jkube-2021-devconf-cz/slide-070');
