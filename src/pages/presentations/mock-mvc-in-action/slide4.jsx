import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {Code} from '../../../components';
import {androidstudio} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './slide4.scss';

const Slide4 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <div className={'slide slide4'}>
      <div className={'title'}>MockMVC Configuration types</div>
      <div className={'content'}>
        <Code className={classNameVisibleFrom(2)} language='java' style={androidstudio}>
          @WebMvcTest annotation</Code>
        <Code className={classNameVisibleFrom(3)} language='java' style={androidstudio}>
          MockMvcBuilders.webAppContextSetup(WebApplicationContext.class);</Code>
        <Code className={classNameVisibleFrom(4)} language='java' style={androidstudio}>
          MockMvcBuilders.standaloneSetup(...);</Code>
      </div>
    </div>
  );
};

export default slideControls(Slide4, '/presentations/mock-mvc-in-action/slide3', '/presentations/mock-mvc-in-action/slide5', 4);
