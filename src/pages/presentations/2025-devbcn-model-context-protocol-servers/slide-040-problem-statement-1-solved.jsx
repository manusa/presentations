import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Slide040 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  const prompt = `I'll be in Barcelona next week, what's the best time to visit Sagrada Familia?`;
  return (
    <DevBcn2025.SlideTemplate slide={4} title='Problem Statement (I): Real-Time Context'>
      <DevBcn2025.ChatGpt>
        <DevBcn2025.ChatGptUserMessage>{prompt}</DevBcn2025.ChatGptUserMessage>
        <DevBcn2025.ChatGptToolCallMessage className={classNameVisibleFrom(2)} toolName='weather_forecast' />
        <DevBcn2025.ChatGptAssistantMessage className={classNameVisibleFrom(3)}>
          Given the <strong>thunderstorms</strong> affecting Barcelona on <strong>Monday and Tuesday</strong>,
          the best time to visit Sagrada Familia is during the
          last part of the week, specifically on <strong>Thursday or Friday</strong>.
          Best <strong>early morning (9-10 AM)</strong> or <strong>late afternoon (4-6PM)</strong> to avoid crowds.
        </DevBcn2025.ChatGptAssistantMessage>
        <DevBcn2025.ChatGptComposer
          hasTools={true}
          placeHolderText='Reply to Hal...'
        />
      </DevBcn2025.ChatGpt>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide040,
  `/presentations/${DevBcn2025.SLUG}/slide-030-problem-statement-1`,
  `/presentations/${DevBcn2025.SLUG}/slide-050-problem-statement-2`,
  3);
