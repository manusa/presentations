import React from 'react';
import {Helmet} from 'react-helmet';
import Card from '../../components/card/card';
import {navigate} from 'gatsby';

const LandingPage = () => {
  // Import styles like this or body css will propagate to all pages
  require('./landing-page.scss');
  return (
    <div className={'wrapper'}>
      <div className={'main'}>
        <Helmet>
          <meta charSet="UTF-8" />
          <title>Marc Nuri's Tech Talks</title>
        </Helmet>
        <header className={'header'}>
          <h1>Marc Nuri's Tech Talks</h1>
        </header>
        <div className={'content'}>
          <Card onClick={() => navigate('/presentations/isotope-introduction')} >Isotope Mail Client Introduction</Card>
          <Card onClick={() => navigate('/presentations/mock-mvc-in-action')} >Work in progress</Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
