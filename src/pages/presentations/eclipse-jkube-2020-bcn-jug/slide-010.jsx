import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import Avatar from './components/avatar';
import SlideTemplate from './components/slide-template';

import './styles/slide-about-me.scss';

const Slide010 = () => (
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
        <div><i className='fab fa-twitter' /> @MarcNuri</div>
        <div><i className='fab fa-linkedin' /> MarcNuri</div>
        <div><i className='fab fa-github' /> <i className='fab fa-gitter' /> manusa</div>
      </div>
    </div>
  </SlideTemplate>
);

export default slideControls(Slide010, '/presentations/eclipse-jkube-2020-bcn-jug', '/presentations/eclipse-jkube-2020-bcn-jug/slide-020');
