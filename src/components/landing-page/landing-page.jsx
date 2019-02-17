import React from 'react';
import {Helmet} from 'react-helmet';
import Card from '../../components/card/card';
import {navigate} from 'gatsby';

export const TITLE = 'Marc Nuri\'s Tech Talks';
export const DESCRIPTION = 'Presentation materials for my talks and presentations';
export const MAIN_URL = 'https://presentations.marcnuri.com';

const LandingPage = () => {
  // Import styles like this or body css will propagate to all pages
  require('./landing-page.scss');
  return (
    <div className={'wrapper'}>
      <div className={'main'}>
        <Helmet>
          <meta charSet="UTF-8" />
          <title>{TITLE}</title>
          <meta name='twitter:url' content={MAIN_URL} />
          <meta property='og:url' content={MAIN_URL} />
          <meta name='twitter:title' content={TITLE} />
          <meta property='og:title' content={TITLE} />
          <meta name='twitter:description' content={DESCRIPTION} />
          <meta property='og:description' content={DESCRIPTION} />
          <meta name='description' content={DESCRIPTION} />
          <meta name='twitter:site' content='@MarcNuri'/>
          <meta property='og:type' content='website' />
          <meta name='twitter:card' content='summary' />
        </Helmet>
        <header className={'header'}>
          <h1>{TITLE}</h1>
        </header>
        <div className={'content'}>
          <Card onClick={() => navigate('/presentations/isotope-introduction')} >Isotope Mail Client Introduction</Card>
          <Card onClick={() => navigate('/presentations/mock-mvc-in-action')} >MockMVC in Action!</Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
