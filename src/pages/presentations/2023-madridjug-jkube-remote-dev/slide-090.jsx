import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {JKubeLogo} from '../../../components';
import {TitleTemplate} from './components/title-template';
import {SLUG, CLASS_NAME} from './index';

import './styles/slide-q-and-a.scss';

const Slide090 = () => (
  <TitleTemplate className={`${CLASS_NAME}-q-and-a`} titleBandVisible={false}>
    <h2 className='q-and-a'>Q&A</h2>
    <div className='reach-out'>
      <a href='https://github.com/eclipse/jkube'><i className='fab fa-github' /> github.com/eclipse/jkube</a>
      <a href='https://twitter.com/jkubeio'><i className='fab fa-twitter' /> @jkubeio</a>
      <a href='https://www.eclipse.org/jkube'><i className='fas fa-home' /> www.eclipse.org/jkube</a>
      <JKubeLogo iconColor='white' textColor='white' />
    </div>
    <div className='presentation-links'>
      <ul>
        <li><a href={`https://presentations.marcnuri.com/presentations/${SLUG}/`}>
          https://presentations.marcnuri.com/presentations/{SLUG}
        </a></li>
      </ul>
    </div>
  </TitleTemplate>
);

export default slideControls(Slide090, `/presentations/${SLUG}/slide-080`, `/presentations/${SLUG}/slide-100`, 1);
