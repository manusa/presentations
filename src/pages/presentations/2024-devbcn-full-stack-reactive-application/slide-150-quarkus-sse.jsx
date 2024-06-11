import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2024} from '../../../components';

import 'highlight.js/styles/railscasts.css';

const Slide150 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  const stepHighlightedLines = {
    4: [2, 3], // Annotations + Method signature
    5: [4], // Multi stream of 0 to * resources (SmallRye Mutiny)
    6: [5, 6], // Emitter (Mutiny)
    7: [7, 8, 10], // Subscription handler (Override to allow closing the subscription in case the client disconnects - keeps it unbounded -no backpressure-)
    8: [9], // response.close closes upstream
    9: [11, 12], // Failure handler
    10: [13, 14], // Completion handler
  }
  const currentHighlightedLines = stepHighlightedLines[currentStep] || [];
  return (
    <DevBcn2024.SlideTemplate slide={15} title='Quarkus: Streaming Server Sent Events'>
      <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <DevBcn2024.YakdStreamDiagram
          style={{
            display: currentStep <= 2 ?'block' : 'none',
            position: 'absolute',
            maxWidth: '100%',
            transform: `scale(${currentStep === 2 ? 2.5 : 1.8}) translateX(${currentStep === 2 ? 280 : 0}px)`,
            transition: 'transform 1s ease-in-out'
          }}
        />
        <Code
          className={`${classNameVisibleFrom(3)}`}
          language='java'
          useInlineStyles={false}
          lineProps={line => (currentHighlightedLines.includes(line) ? {class: 'devbcn-2024__code--highlighted'} : {})}
        >{`
          // com.marcnuri.yakd.watch.WatchResource|WatchService simplified
          @GET
          @RestStreamElementType(MediaType.APPLICATION_JSON)
          public Multi<WatchEvent<?>> get(@Context HttpServerResponse response) {
            return Multi.createFrom()
              .emitter(new SelfHealingWatchableEmitter(executorService, watchables))
              .onSubscription()
                .invoke(subscription -> {
                  response.closeHandler(v -> subscription.cancel());
                })
              .onFailure()
                .invoke(throwable ->  LOG.warn("Watch subscription closed: {}", throwable.getMessage()))
              .onCompletion()
                .invoke(() ->  LOG.debug("Watch subscription closed gracefully"));
          }
        `}</Code>
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide150,
  `/presentations/${DevBcn2024.SLUG}/slide-140-why-quarkus`,
  `/presentations/${DevBcn2024.SLUG}/slide-160-quarkus-self-healing`,
  10);
