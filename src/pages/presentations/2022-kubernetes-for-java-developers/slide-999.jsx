import React from 'react';
import {CLASS_NAME} from './';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';

import './styles/slide-thank-you.scss';

const Slide999 = () => (
  <TitleTemplate className={`${CLASS_NAME}-thank-you`}>
    <h2 className='thank-you'>Thank you!</h2>
    <div className='reach-out'>
      <a href='https://github.com/eclipse/jkube'><i className='fab fa-github' /> github.com/eclipse/jkube</a>
      <a href='https://twitter.com/jkubeio'><i className='fab fa-twitter' /> @jkubeio</a>
      <a href='https://www.eclipse.org/jkube'><i className='fas fa-home' /> www.eclipse.org/jkube</a>
    </div>
    <div className='presentation-links'>
      <ul>
        <li><a href='https://presentations.marcnuri.com/presentations/2022-kubernetes-for-java-developers/'>
          https://presentations.marcnuri.com/presentations/2022-kubernetes-for-java-developers
        </a></li>
      </ul>
    </div>
  </TitleTemplate>
);

export default slideControls(Slide999, '/presentations/2022-kubernetes-for-java-developers/slide-100', '/presentations/2022-kubernetes-for-java-developers');
