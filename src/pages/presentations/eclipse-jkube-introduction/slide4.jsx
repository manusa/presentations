import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
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

const Slide4 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <SlideTemplate slide={4} title='What is Eclipse JKube?'>
      <ul className='what-is-jkube'>
        <li>
          Tools and plugins
          <ul>
            <li>Generate container images (Docker, S2I, JIB)</li>
            <li>Generate and deploy configuration manifests (Kubernetes / OpenShift)</li>
          </ul>
        </li>
        <li className={classNameVisibleFrom(2)}>
          3 configuration modes
          <ul>
            <li><strong>Zero Config</strong>, Opinionated defaults</li>
            <li><strong>XML</strong> plugin configuration</li>
            <li><strong>Resource fragments</strong> enrich missing parts of opinionated defaults</li>
          </ul>
        </li>
        <li className={classNameVisibleFrom(3)}>
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
      </ul>
    </SlideTemplate>
  );
};

export default slideControls(Slide4, '/presentations/eclipse-jkube-introduction/slide3', '/presentations/eclipse-jkube-introduction/slide5', 3);
