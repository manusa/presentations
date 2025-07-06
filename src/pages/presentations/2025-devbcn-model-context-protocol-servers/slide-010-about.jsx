import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {Avatar, DevBcn2025, fullstackQuarkusReactImage} from '../../../components';

import '../../../components/2025-devbcn-model-context-protocol-servers/styles/slide-about-me.scss';

const Slide010 = ({currentStep}) => {
  return (
    <DevBcn2025.SlideTemplate slide={1} title='About me'>
      <div className='about-me'>
        <div className='about-me__bio'>
          <Avatar className='avatar' />
          <div>
            <h2>Marc Nuri</h2>
            <p>Principal Software Engineer - Red Hat</p>
            <h4>Working on:</h4>
            <ul>
              <li>Kubernetes MCP Server</li>
              <li>Fabric8 Kubernetes Client</li>
              <li>Eclipse JKube</li>
            </ul>
            <div><a href='https://twitter.com/MarcNuri'><i className='fab fa-twitter' /> @MarcNuri</a></div>
            <div><a href='https://linkedin.com/in/MarcNuri'><i className='fab fa-linkedin' /> MarcNuri</a></div>
            <div><a href='https://github.com/manusa'><i className='fab fa-github' /> <i className='fab fa-gitter' /> manusa</a></div>
          </div>
        </div>
        <div className='book'>
          <img src={fullstackQuarkusReactImage} alt='Full Stack Quarkus and React book cover' />
        </div>
      </div>
    </DevBcn2025.SlideTemplate>
  );
}

export default slideControls(Slide010,
  `/presentations/${DevBcn2025.SLUG}`,
  `/presentations/${DevBcn2025.SLUG}/slide-020-agenda`);
