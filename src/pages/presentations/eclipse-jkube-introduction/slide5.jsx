import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';
import jettyLogo from './assets/frameworks/jetty-logo.png';
import karafLogo from './assets/frameworks/karaf-logo.png';
import openLibertyLogo from './assets/frameworks/open-liberty-logo.png';
import quarkusLogo from './assets/frameworks/quarkus-logo.png';
import springBootLogo from './assets/frameworks/spring-boot-logo.png';
import thorntailLogo from './assets/frameworks/thorntail-logo.png';
import tomcatLogo from './assets/frameworks/tomcat-logo.png';
import vertxLogo from './assets/frameworks/vertx-logo.png';
import wildflyLogo from './assets/frameworks/wildfly-logo.png';
import './styles/slide4.scss';

const Slide5 = () => (
  <SlideTemplate slide={5} title='What is Eclipse JKube? (2)'>
    <ul className='what-is-jkube'>
      <li>
        Support for multiple frameworks and technologies
        <div className='framework-container'>
          <img className='item' src={wildflyLogo} />
          <img className='item' src={vertxLogo} />
          <img className='item' src={quarkusLogo} />
          <img className='item' src={springBootLogo} />
          <img className='item' src={openLibertyLogo} />
          <img className='item' src={thorntailLogo} />
          <img className='item' src={tomcatLogo} />
          <img className='item' src={jettyLogo} />
          <img className='item' src={karafLogo} />
        </div>
      </li>
      <li>
        3 configuration modes
        <ul>
          <li><strong>Zero Config</strong>, Opinionated defaults</li>
          <li><strong>XML</strong> plugin configuration</li>
          <li><strong>Resource fragments</strong> enrich missing parts of opinionated defaults</li>
        </ul>
      </li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide5, '/presentations/eclipse-jkube-introduction/slide4', '/presentations/eclipse-jkube-introduction/slide6');
