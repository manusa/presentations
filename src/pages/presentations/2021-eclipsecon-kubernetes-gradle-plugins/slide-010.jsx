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
        <p>Principal Software Engineer - Red Hat</p>
        <h4>Working on:</h4>
        <ul>
          <li>Fabric8 Kubernetes Client</li>
          <li>Eclipse JKube</li>
        </ul>
        <div><a href='https://twitter.com/MarcNuri'><i className='fab fa-twitter' /> @MarcNuri</a></div>
        <div><a href='https://linkedin.com/in/MarcNuri'><i className='fab fa-linkedin' /> MarcNuri</a></div>
        <div><a href='https://github.com/manusa'><i className='fab fa-github' /> <i className='fab fa-gitter' /> manusa</a></div>
      </div>
    </div>
  </SlideTemplate>
);

export default slideControls(Slide010, '/presentations/2021-eclipsecon-kubernetes-gradle-plugins', '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-020');
