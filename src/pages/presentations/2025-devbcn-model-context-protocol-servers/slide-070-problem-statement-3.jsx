import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Slide070 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  const prompt = `I need a PostgreSQL database, can you deploy one for me in my Kubernetes cluster?`;
  return (
    <DevBcn2025.SlideTemplate slide={7} title='Problem Statement (III): Specialized Tools'>
      <DevBcn2025.ChatGpt>
        {currentStep < 3 && <DevBcn2025.ChatGptGreeting />}
        <DevBcn2025.ChatGptUserMessage className={classNameVisibleFrom(3)}>{prompt}</DevBcn2025.ChatGptUserMessage>
        <DevBcn2025.ChatGptAssistantMessage className={classNameVisibleFrom(4)}>
          I’m unable to directly deploy infrastructure or access your Kubernetes cluster myself.
          However, I can guide you step-by-step, generate the necessary Kubernetes YAML manifests (Deployment, StatefulSet, Service, Secret, etc.), or provide a Helm chart command to deploy PostgreSQL.
        </DevBcn2025.ChatGptAssistantMessage>
        <DevBcn2025.ChatGptComposer
          input={currentStep === 2 ? prompt : undefined}
          placeHolderText={currentStep > 1 ? 'Reply to Hal...' : undefined}
        />
      </DevBcn2025.ChatGpt>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide070,
  `/presentations/${DevBcn2025.SLUG}/slide-060-problem-statement-2-solved`,
  `/presentations/${DevBcn2025.SLUG}/slide-080-problem-statement-3-solved`,
  4);
