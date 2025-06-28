import React, {useState, useEffect} from 'react';
import {navigate} from 'gatsby';

export const visibleClassNameFromStep = currentStep => step =>
  ((currentStep < step) ? 'hidden' : 'visible');

export const visibleClassNameInStep = currentStep => step =>
  ((currentStep !== step) ? 'hidden' : 'visible');

export const visibleClassNameUntilStep = currentStep => step =>
  ((currentStep > step) ? 'hidden' : 'visible');

function slideControls(WrappedComponent, previousPage, nextPage, totalSteps = 1) {
  return ({...props}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const handleOnKeyDown = (event) => {
      switch (event.key) {
        case 'Left':
        case 'ArrowLeft':
          if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
          } else {
            navigate(previousPage);
          }
          break;
        case 'Right':
        case 'ArrowRight':
          if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
          } else {
            navigate(nextPage);
          }
          break;
        case 'Esc':
        case 'Escape':
          navigate('/');
          break;
        default:
      }
    };
    useEffect(() => {
      document.addEventListener('keydown', handleOnKeyDown, false);
      return () => {
        document.removeEventListener('keydown', handleOnKeyDown, false);
      };
    }, [currentStep]);

    return <WrappedComponent {...props} currentStep={currentStep} />;
  }
}

export default slideControls;
