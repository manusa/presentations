import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2024, kubernetesComponentsDiagram} from '../../../components';

const Slide140 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <DevBcn2024.SlideTemplate slide={14} title='Why Quarkus?'>
      <ul>
        <li className={classNameVisibleFrom(2)}>
          Optimized for Java and Kubernetes
        </li>
        <li className={classNameVisibleFrom(3)}>
          Fast boot times and low memory footprint
        </li>
        <li className={classNameVisibleFrom(4)}>
          Developer Joy
        </li>
        <li className={classNameVisibleFrom(5)}>
          Supports reactive programming out of the box
          <Code language='xml' useInlineStyles={false}>{`
            <dependency>
              <groupId>io.quarkus</groupId>
              <artifactId>quarkus-rest</artifactId>
            </dependency>
          `}</Code>
          <ul>
            <li>Non blocking I/O (Vert.x + Netty)</li>
            <li>Unification of imperative and reactive (<code>@Blocking</code>)</li>
            <li>Server Sent Events</li>
          </ul>
        </li>
        <li className={classNameVisibleFrom(6)}>
          Good integration with the Fabric8 Kubernetes Client
          <Code language='xml' useInlineStyles={false}>{`
            <dependency>
              <groupId>io.quarkus</groupId>
              <artifactId>quarkus-kubernetes-client</artifactId>
            </dependency>
          `}</Code>
        </li>
      </ul>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide140,
  `/presentations/${DevBcn2024.SLUG}/slide-130-resilient-backend-quarkus`,
  `/presentations/${DevBcn2024.SLUG}/slide-150-quarkus-sse`,
  6);
