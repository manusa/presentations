import React from 'react';
import {Helmet} from 'react-helmet';
import './index/index.scss';
import '../styles/main.scss';

const Index = () => (
    <div className={'main'}>
      <Helmet>
        <meta charSet="UTF-8" />
        <title>Marc Nuri Tech Talks</title>
      </Helmet>
      <h1>Marc Nuri's Tech Talks</h1>
      <p>Work in progress</p>
    </div>
  );

export default Index;
