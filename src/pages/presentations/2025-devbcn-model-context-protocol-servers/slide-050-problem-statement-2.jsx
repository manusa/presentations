import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Slide050 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  const prompt = `Can you order the tickets for me?`;
  return (
    <DevBcn2025.SlideTemplate slide={5} title='Problem Statement (II): Real Assistant'>
      <DevBcn2025.ChatGpt>
        <DevBcn2025.ChatGptUserMessage>
          I'll be in Barcelona next week, what's the best time to visit Sagrada Familia?
        </DevBcn2025.ChatGptUserMessage>
        <DevBcn2025.ChatGptAssistantMessage>
          <strong>Early morning (9-10 AM)</strong> or <strong>late afternoon (4-6PM)</strong> on weekdays.
          Avoid weekends and holidays if possible.
        </DevBcn2025.ChatGptAssistantMessage>
        <DevBcn2025.ChatGptUserMessage className={classNameVisibleFrom(3)}>{prompt}</DevBcn2025.ChatGptUserMessage>
        <DevBcn2025.ChatGptAssistantMessage className={classNameVisibleFrom(4)}>
          I can't directly order tickets for you, but I can guide you to the right place:<br/>
          <strong>Official website:</strong> sagradafamilia.org<br/>
          You'll need to select your date, time slot, and ticket type (basilica only, or basilica + towers).<br/>
          The site accepts major credit cards and shows real-time availability.
        </DevBcn2025.ChatGptAssistantMessage>
        <DevBcn2025.ChatGptComposer
          input={currentStep === 2 ? prompt : undefined}
          placeHolderText='Reply to Hal...'
        />
      </DevBcn2025.ChatGpt>
      {currentStep === 5 && <img
        src={DevBcn2025.michaelScott}
        style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '70%', objectFit: 'contain'
      }}
      />}
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide050,
  `/presentations/${DevBcn2025.SLUG}/slide-040-problem-statement-1-solved`,
  `/presentations/${DevBcn2025.SLUG}/slide-060-problem-statement-2-solved`,
  5);
