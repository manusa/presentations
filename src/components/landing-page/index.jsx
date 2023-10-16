import React from 'react';
import {Helmet} from 'react-helmet';
import {navigate} from 'gatsby';
import {Card} from '../';

export const TITLE = 'Marc Nuri\'s Tech Talks';
export const DESCRIPTION = 'Presentation materials for my talks and presentations';
export const MAIN_URL = 'https://presentations.marcnuri.com';

export const LandingPage = () => {
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
          <Card onClick={() => navigate('/presentations/2023-eclipsecon-helm-for-java-developers')} >Helm for Java developers with Eclipse JKube (EclipseCon 2023)</Card>
          <Card onClick={() => navigate('/presentations/2023-madridjug-jkube-remote-dev')} >Desarrollo local de aplicaciones Java en Kubernetes (MadridJUG 2023)</Card>
          <Card onClick={() => navigate('/presentations/2022-eclipsecon-whats-up-doc')} >Eclipse JKube: What's up Doc? (EcliseCon 2022)</Card>
          <Card onClick={() => navigate('/presentations/2022-kubernetes-for-java-developers')} >Kubernetes for Java developers workshop</Card>
          <Card onClick={() => navigate('/presentations/2021-eclipsecon-kubernetes-gradle-plugins')} >Containerize and deploy into Kubernetes your Gradle Java project with Eclipse JKube (EclipseCon 2021)</Card>
          <Card onClick={() => navigate('/presentations/eclipse-jkube-2021-devconf-cz')} >Containerize your Java Applications using Eclipse JKube (DevConf.cz 2021)</Card>
          <Card onClick={() => navigate('/presentations/eclipse-jkube-2021-cloud-tool-time')} >Deploying a Quarkus application into Kubernetes using JKube (Eclipse Cloud Tool Time 2021)</Card>
          <Card onClick={() => navigate('/presentations/eclipse-jkube-2020-bcn-jug')} >Microservice Containerization made easy using Eclipse JKube (BarcelonaJUG 2020)</Card>
          <Card onClick={() => navigate('/presentations/eclipse-jkube-introduction')} >Deploy your Java applications to the Cloud using Eclipse JKube (EclipseCon 2020)</Card>
          <Card onClick={() => navigate('/presentations/mock-mvc-in-action')} >MockMVC in Action!</Card>
          <Card onClick={() => navigate('/presentations/isotope-introduction')} >Isotope Mail Client Introduction</Card>
        </div>
      </div>
    </div>
  );
};
