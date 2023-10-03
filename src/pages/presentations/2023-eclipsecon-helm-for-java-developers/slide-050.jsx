import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {Code, EclipseCon2023} from '../../../components';

const Slide050 = () => {
  return (
    <EclipseCon2023.SlideTemplate slide={5} title='Deploying Java applications to Kubernetes - Challenges'>
      <h2>Dockerfile</h2>
      <Code language='dockerfile'>{`
        FROM openjdk:8-jdk-alpine
        EXPOSE 8080
        ARG JAR_FILE=target/*.jar
        USER 1000:1000
        COPY \${JAR_FILE} /deployments/app.jar
        ENV JAVA_OPTIONS="-XX:MaxRAMPercentage=80"
        ENTRYPOINT ["java","-jar","/deployments/app.jar"]
      `}</Code>
      <Code language='shell'>{`
        $ mvn package
        $ docker build -t user/app:tag ./
        $ docker login
        $ docker push user/app:tag
      `}</Code>
    </EclipseCon2023.SlideTemplate>
  );
}

export default slideControls(Slide050,
  `/presentations/${EclipseCon2023.SLUG}/slide-040`,
  `/presentations/${EclipseCon2023.SLUG}/slide-060`);
