import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {Avatar, FullstackQuarkusReactAd} from '../../../components';
import {SLUG} from './';
import {SlideTemplate} from './components/slide-template';

import './styles/slide-about-me.scss';

const Slide010 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
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
        <FullstackQuarkusReactAd className={`advertisement ${classNameVisibleFrom(2)}`} />
      </div>
    </SlideTemplate>
  );
};

export default slideControls(Slide010, `/presentations/${SLUG}`, `/presentations/${SLUG}/slide-020`, 2);
