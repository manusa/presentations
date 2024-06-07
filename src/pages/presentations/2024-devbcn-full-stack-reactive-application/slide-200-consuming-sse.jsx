import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2024, kubernetesComponentsDiagram} from '../../../components';

const Slide200 = ({currentStep}) => {
  const stepHighlightedLines = {
  };
  const currentHighlightedLines = stepHighlightedLines[currentStep] || [];
  return (
    <DevBcn2024.SlideTemplate slide={20} title='Frontend: Consuming Events Reactively'>
      <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <Code
          language='javascript'
          useInlineStyles={false}
          lineProps={line => (currentHighlightedLines.includes(line) ? {class: 'devbcn-2024__code--highlighted'} : {})}
        >{`
          // pseudo-code
          const eventSource = new EventSource('backend.host/api/v1/watch');
          eventSource.onopen = function() {
            clearErrors();
            clearStore();
          };
          eventSource.onmessage = function(event) {
            const message = JSON.parse(event.data);
            persistInStore(message);
          };
          eventSource.onerror = function() {
            setError('Connection lost');
          };
        `}</Code>
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide200,
  `/presentations/${DevBcn2024.SLUG}/slide-190-keeping-state`,
  `/presentations/${DevBcn2024.SLUG}/slide-210`,
  3);
