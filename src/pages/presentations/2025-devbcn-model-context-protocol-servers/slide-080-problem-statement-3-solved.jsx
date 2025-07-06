import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Slide080 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  const prompt = `I need a PostgreSQL database, can you deploy one for me in my Kubernetes cluster?`;
  return (
    <DevBcn2025.SlideTemplate slide={8} title='Problem Statement (III): Specialized Tools'>
      <DevBcn2025.ChatGpt>
        <DevBcn2025.ChatGptUserMessage>{prompt}</DevBcn2025.ChatGptUserMessage>
        <DevBcn2025.ChatGptToolCallMessage className={classNameVisibleFrom(2)} toolName='pod_create' />
        <DevBcn2025.ChatGptToolCallMessage className={classNameVisibleFrom(3)} toolName='port_forward' />
        <DevBcn2025.ChatGptAssistantMessage className={classNameVisibleFrom(4)}>
          I've created a PostgreSQL pod in your Kubernetes cluster and forwarded the port to your local machine.
          You can now connect to it using the following database connection string:
          <pre>postgres://user:password@localhost:5432/mydatabase</pre>
        </DevBcn2025.ChatGptAssistantMessage>
        <DevBcn2025.ChatGptComposer
          hasTools={true}
          placeHolderText='Reply to Hal...'
        />
      </DevBcn2025.ChatGpt>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide080,
  `/presentations/${DevBcn2025.SLUG}/slide-070-problem-statement-3`,
  `/presentations/${DevBcn2025.SLUG}/slide-090-problem-statement-summary`,
  4);
