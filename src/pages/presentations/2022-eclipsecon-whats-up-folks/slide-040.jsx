import React from 'react';
import slideControls, {
  visibleClassNameFromStep, visibleClassNameInStep, visibleClassNameUntilStep
} from '../../../components/slide-controls/slide-controls';
import {SlideTemplate} from './components/slide-template';
import {SLUG} from './index';

const Slide040 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  const classNameVisibleIn = visibleClassNameInStep(currentStep);
  const classNameVisibleUntil = visibleClassNameUntilStep(currentStep);
  return (
    <SlideTemplate slide={4} title="What's new?">
    </SlideTemplate>
  );
};

export default slideControls(Slide040, `/presentations/${SLUG}/slide-030`, `/presentations/${SLUG}/slide-050`, 1);
