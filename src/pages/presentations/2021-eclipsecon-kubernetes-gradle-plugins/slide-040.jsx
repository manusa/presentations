import React from 'react';
import slideControls, {visibleClassNameInStep} from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';
import Code from '../../../components/code';
import JKubeLogo from '../../../components/icons/jkube-logo';

import './styles/slide-challenges.scss';

const Slide040 = ({currentStep}) => {
  const classNameVisibleIn = visibleClassNameInStep(currentStep);
  return (
    <SlideTemplate slide={4} title='Deploying applications to Kubernetes - Challenges'>
      <div className='kubernetes-challenges'>
        <div className={`challenge-docker ${classNameVisibleIn(2)}`}>
          <h2>Dockerfile</h2>
          <Code language='dockerfile'>{`
FROM openjdk:17-jdk-alpine
EXPOSE 8080
ARG JAR_FILE=target/*.jar
USER 1000:1000
COPY \${JAR_FILE} /deployments/app.jar
ENV JAVA_OPTIONS="-Xmx2G"
ENTRYPOINT ["java","-jar","/deployments/app.jar"]
          `}</Code>
          <Code language='shell'>{`
$ mvn package
$ docker build -t user/app:tag ./
$ docker login
$ docker push user/app:tag
          `}</Code>
        </div>
        <div className={`challenge-kubernetes ${classNameVisibleIn(3)}`}>
          <h2>YAML files</h2>
          <div className='yaml-files'>
            <Code language='yaml'>{`
kind: Deployment
metadata:
  name: app
spec:
  replicas: 1
  selector:
# ...
          `}</Code>
            <Code language='yaml'>{`
kind: Service
metadata:
  name: app
spec:
  ports:
# ...
          `}</Code>
            <Code language='yaml'>{`
kind: ConfigMap
metadata:
  name: app
data:
 application.yml: >-
# ...
          `}</Code>
          </div>
          <Code language='shell'>{`
$ kubectl apply -f ./your-yaml.yml
          `}</Code>
        </div>
        <div className={`challenge-jkube ${classNameVisibleIn(4)}`}>
          <JKubeLogo className='jkube-logo' />
        </div>
      </div>
    </SlideTemplate>
  );
};

export default slideControls(Slide040, '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-030', '/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-050', 4);
