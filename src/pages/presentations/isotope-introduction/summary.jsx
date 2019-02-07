import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import './slide-summary.scss';
import twitterLogo from './assets/twitter-64.png';
import githubLogo from './assets/github-64.png';

const SlideSummary = () => (
  <div className={'slide slide-summary'}>
    <div className={'content'}>
      <div className={'col links'}>
        <div className={'thank-you'}>Thank you!</div>
        <a className={'github'} href={'https://github.com/manusa/isotope-mail'}><img src={githubLogo} />github.com/manusa/isotope-mail</a>
        <a className={'twitter'} href={'https://twitter.com/MarcNuri'}><img src={twitterLogo} />@MarcNuri</a>
        <a className={'blog'} href={'https://blog.marcnuri.com'}>blog.marcnuri.com</a>
      </div>
      <div className={'col isotope-logo'}>
      </div>
    </div>
  </div>
);

export default slideControls(SlideSummary, '/presentations/isotope-introduction/slide-q-and-a', '/');
