import React from 'react';
import slideControls, {visibleClassNameInStep} from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';
import SyntaxHighlighter from 'react-syntax-highlighter';

import './styles/slide-challenges.scss';
import {androidstudio} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import JKubeLogo from "./components/jkube-logo";

const Slide040 = ({currentStep}) => {
  const classNameVisibleIn = visibleClassNameInStep(currentStep);
  return (
    <SlideTemplate slide={4} title='Deploying applications to Kubernetes - Challenges'>
      <div className='kubernetes-challenges'>
        <div className={`challenge-docker ${classNameVisibleIn(2)}`}>
          <h2>Dockerfile</h2>
          <SyntaxHighlighter
            language={'dockerfile'} style={androidstudio}>
            {`
FROM openjdk:8-jdk-alpine
EXPOSE 8080
ARG JAR_FILE=target/*.jar
USER 1000:1000
COPY \${JAR_FILE} /deployments/app.jar
ENV JAVA_OPTIONS="-Xmx2G"
ENTRYPOINT ["java","-jar","/deployments/app.jar"]
          `}
          </SyntaxHighlighter>
          <SyntaxHighlighter
            language={'shell'} style={androidstudio}>
            {`
$ mvn package
$ docker build -t user/app:tag ./
$ docker login
$ docker push user/app:tag
          `}
          </SyntaxHighlighter>
        </div>
        <div className={`challenge-kubernetes ${classNameVisibleIn(3)}`}>
          <h2>YAML files</h2>
          <div className='yaml-files'>
            <SyntaxHighlighter
              language={'yaml'} style={androidstudio}>
              {`
kind: Deployment
metadata:
  name: app
spec:
  replicas: 1
  selector:
# ...
          `}
            </SyntaxHighlighter>
            <SyntaxHighlighter
              language={'yaml'} style={androidstudio}>
              {`
kind: Service
metadata:
  name: app
spec:
  ports:
# ...
          `}
            </SyntaxHighlighter>
            <SyntaxHighlighter
              language={'yaml'} style={androidstudio}>
              {`
kind: ConfigMap
metadata:
  name: app
data:
 application.yml: >-
# ...
          `}
            </SyntaxHighlighter>
          </div>
          <SyntaxHighlighter
            language={'shell'} style={androidstudio}>
            {`
$ kubectl apply -f ./your-yaml.yml
          `}
          </SyntaxHighlighter>
        </div>
        <div className={`challenge-jkube ${classNameVisibleIn(4)}`}>
          <JKubeLogo className='jkube-logo' />
        </div>
      </div>
    </SlideTemplate>
  );
};

export default slideControls(Slide040, '/presentations/eclipse-jkube-2021-devconf-cz/slide-030', '/presentations/eclipse-jkube-2021-devconf-cz/slide-050', 4);
