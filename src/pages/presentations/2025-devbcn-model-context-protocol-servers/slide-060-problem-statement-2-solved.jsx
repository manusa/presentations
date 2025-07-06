import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Slide060 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  const prompt = `Can you order the tickets for me?`;
  return (
    <DevBcn2025.SlideTemplate slide={6} title='Problem Statement (II): Real Assistant'>
      <DevBcn2025.ChatGpt>
        <DevBcn2025.ChatGptUserMessage>
          I'll be in Barcelona next week, what's the best time to visit Sagrada Familia?
        </DevBcn2025.ChatGptUserMessage>
        <DevBcn2025.ChatGptAssistantMessage>
          <strong>Early morning (9-10 AM)</strong> or <strong>late afternoon (4-6PM)</strong> on weekdays.
          Avoid weekends and holidays if possible.
        </DevBcn2025.ChatGptAssistantMessage>
        <DevBcn2025.ChatGptUserMessage>{prompt}</DevBcn2025.ChatGptUserMessage>
        <DevBcn2025.ChatGptToolCallMessage className={classNameVisibleFrom(2)} toolName='tickets_order' />
        <DevBcn2025.ChatGptAssistantMessage className={classNameVisibleFrom(3)}>
          I've successfully booked your tickets for Sagrada Familia on <strong>Thursday at 9 AM</strong>.
          You'll receive a confirmation email shortly.
        </DevBcn2025.ChatGptAssistantMessage>
        <DevBcn2025.ChatGptComposer
          hasTools={true}
          placeHolderText='Reply to Hal...'
        />
      </DevBcn2025.ChatGpt>
      {currentStep === 4 && <img
        src={DevBcn2025.successKid}
        style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '70%', objectFit: 'contain'
        }}
      />}
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide060,
  `/presentations/${DevBcn2025.SLUG}/slide-050-problem-statement-2`,
  `/presentations/${DevBcn2025.SLUG}/slide-070-problem-statement-3`,
  4);
