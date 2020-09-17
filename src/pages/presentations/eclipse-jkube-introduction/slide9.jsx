import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import TitleTemplate from './components/title-template';
import JKubeLogo from './components/jkube-logo';
import './styles/slide9.scss';

const Slide9 = () => (
  <TitleTemplate className='eclipse-jkube-introduction-thank-you'>
    <h2 className='thank-you'>Thank you!</h2>
    <div className='reach-out'>
      <a href='https://github.com/eclipse/jkube'><i className='fab fa-github' /> github.com/eclipse/jkube</a>
      <a href='https://twitter.com/jkubeio'><i className='fab fa-twitter' /> @jkubeio</a>
      <a href='https://www.eclipse.org/jkube'><i className='fas fa-home' /> www.eclipse.org/jkube</a>
      <JKubeLogo className='jkube-logo' />
    </div>
  </TitleTemplate>
);

export default slideControls(Slide9, '/presentations/eclipse-jkube-introduction/slide8', '/presentations/eclipse-jkube-introduction');
