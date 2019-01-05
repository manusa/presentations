import React from 'react';
import {Helmet} from 'react-helmet';
import Card from '../components/card/card';
import './index/index.scss';
import '../styles/main.scss';

const Index = () => (
    <div className={'main'}>
      <Helmet>
        <meta charSet="UTF-8" />
        <title>Marc Nuri's Tech Talks</title>
      </Helmet>
      <header className={'header'}>
        <h1>Marc Nuri's Tech Talks</h1>
      </header>
      <div className={'content'}>
        <Card>Work in progress</Card>
      </div>
    </div>
  );

export default Index;
