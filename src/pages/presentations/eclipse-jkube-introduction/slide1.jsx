import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import Avatar from './components/avatar';
import SlideTemplate from './components/slide-template';
import './styles/slide1.scss';

const Slide1 = () => (
  <SlideTemplate slide={1} title='About me'>
    <div className='about-me'>
      <Avatar className='avatar' />
      <div>
        <h2>Marc Nuri</h2>
        <p>Senior Software Engineer - Red Hat</p>
        <h4>Working on:</h4>
        <ul>
          <li>Fabric8 Kubernetes Client</li>
          <li>Eclipse JKube</li>
        </ul>
        @MarcNuri
      </div>
    </div>
  </SlideTemplate>
);

export default slideControls(Slide1, '/presentations/eclipse-jkube-introduction', '/presentations/eclipse-jkube-introduction/slide2');
