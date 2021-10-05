import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';

const Slide060 = () => (
  <SlideTemplate slide={6} title='What is Eclipse JKube? (2)'>
    <ul className='what-is-jkube'>
      <li>
        Configuration modes
        <ul>
          <li>
            <strong>Zero Config</strong>, Opinionated defaults
            <ol>
              <li>
                Project Analysis and cluster detection
                <ul>
                  <li>Support for multiple frameworks</li>
                </ul>
              </li>
              <li>Inferred image configuration</li>
              <li>Inferred cluster manifests </li>
            </ol>
          </li>
          <li><strong>pom.xml</strong>/<strong>build.gradle</strong> plugin configuration</li>
          <li>Maven/Gradle <strong>properties</strong> plugin configuration</li>
          <li><strong>Resource fragments</strong> enrich missing parts of opinionated defaults</li>
        </ul>
      </li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide060, '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-050', '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-070');
