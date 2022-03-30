import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {JKubeLogo} from '../../../components';
import TitleTemplate from './components/title-template';

import './styles/slide-thank-you.scss';

const Slide050 = () => (
  <TitleTemplate className='eclipse-jkube-2021-cloud-tool-time-thank-you'>
    <h2 className='thank-you'>Thank you!</h2>
    <div className='reach-out'>
      <a href='https://github.com/eclipse/jkube'><i className='fab fa-github' /> github.com/eclipse/jkube</a>
      <a href='https://twitter.com/jkubeio'><i className='fab fa-twitter' /> @jkubeio</a>
      <a href='https://www.eclipse.org/jkube'><i className='fas fa-home' /> www.eclipse.org/jkube</a>
      <JKubeLogo className='jkube-logo' />
    </div>
  </TitleTemplate>
);

export default slideControls(Slide050, '/presentations/eclipse-jkube-2021-cloud-tool-time/slide-040', '/presentations/eclipse-jkube-2021-cloud-tool-time');
