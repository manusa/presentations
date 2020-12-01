import React from 'react';
import SlideTemplate from './components/slide-template';
import slideControls from '../../../components/slide-controls/slide-controls';

const Slide020 = () => (
  <SlideTemplate slide={2} title='Agenda'>
    <ul>
      <li>Cloud Native / Kubernetes / Microservices et al.</li>
      <li>What is Eclipse JKube?</li>
      <li>
        Demos with Apache Kafka as Backend
        <ul>
          <li>Spring Boot 2.x - Deploying Kafdrop</li>
          <li>Quarkus the easy way...</li>
          <li>Spring Boot 1.x - We won't forget you!</li>
        </ul>
      </li>
      <li>Future developments</li>
    </ul>
  </SlideTemplate>
);

export default slideControls(Slide020, '/presentations/eclipse-jkube-2020-bcn-jug/slide-010', '/presentations/eclipse-jkube-2020-bcn-jug/slide-030');
