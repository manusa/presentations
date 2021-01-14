import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import SlideTemplate from './components/slide-template';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {androidstudio} from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import './styles/slide-what-is-jkube.scss';

const Slide060 = () => (
  <SlideTemplate slide={7} title='What is Eclipse JKube? (3)'>
    <div className='what-is-jkube'>
      <SyntaxHighlighter
        language={'xml'} style={androidstudio}>
        {`
<plugin>
  <groupId>org.eclipse.jkube</groupId>
  <artifactId>kubernetes-maven-plugin</artifactId>
  <version>1.1.0</version>
</plugin>
          `}
      </SyntaxHighlighter>
      <SyntaxHighlighter
        language={'bash'} style={androidstudio}>
        {`
$ mvn package k8s:build k8s:push k8s:resource k8s:apply
# Or even better
$ mvn package k8s:deploy
          `}
      </SyntaxHighlighter>
    </div>
  </SlideTemplate>
);

export default slideControls(Slide060, '/presentations/eclipse-jkube-2021-devconf-cz/slide-060', '/presentations/eclipse-jkube-2021-devconf-cz/slide-080');
