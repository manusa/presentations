import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Slide030 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  const prompt = `I'll be in Barcelona next week, what's the best time to visit Sagrada Familia?`;
  return (
    <DevBcn2025.SlideTemplate slide={3} title='Problem Statement (I): Real-Time Context'>
      <DevBcn2025.ChatGpt>
        {currentStep < 3 && <DevBcn2025.ChatGptGreeting />}
        <DevBcn2025.ChatGptUserMessage className={classNameVisibleFrom(3)}>{prompt}</DevBcn2025.ChatGptUserMessage>
        <DevBcn2025.ChatGptAssistantMessage className={classNameVisibleFrom(4)}>
          <strong>Early morning (9-10 AM)</strong> or <strong>late afternoon (4-6PM)</strong> on weekdays.
          Avoid weekends and holidays if possible.
        </DevBcn2025.ChatGptAssistantMessage>
        <DevBcn2025.ChatGptComposer
          input={currentStep === 2 ? prompt : undefined}
          placeHolderText={currentStep > 1 ? 'Reply to Hal...' : undefined}
        />
      </DevBcn2025.ChatGpt>
      {currentStep === 5 && <img
        src={DevBcn2025.theDailyPunctilioThunderstorms}
        style={{position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '100%', objectFit: 'contain'}}
      />}
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide030,
  `/presentations/${DevBcn2025.SLUG}/slide-020-agenda`,
  `/presentations/${DevBcn2025.SLUG}/slide-040-problem-statement-1-solved`,
  5);
