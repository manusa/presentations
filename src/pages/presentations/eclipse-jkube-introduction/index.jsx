import React from 'react';
import {Helmet} from 'react-helmet';
import logo from './assets/eclipsecon.png';
import slideControls from '../../../components/slide-controls/slide-controls';
import './index.scss';

const TITLE = 'Deploy your Java applications to the Cloud using Eclipse JKube';

const MockMvcInAction = () => (
  <div className='eclipse-jkube-introduction'>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <div className='eclipse-jkube-introduction-index'>
      <div className='eclipse-jkube-introduction-index__content'>
        <div className='logo'>
          <img src={logo} />
        </div>
        <div className='title-band'>
          <h1 className='title'>{TITLE}</h1>
          <h2 className='subtitle'>Marc Nuri</h2>
        </div>
      </div>
    </div>
  </div>
);

export default slideControls(MockMvcInAction, '/', '/presentations/eclipse-jkube-introduction/slide1');
