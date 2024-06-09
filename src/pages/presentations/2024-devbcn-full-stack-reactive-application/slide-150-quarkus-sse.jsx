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
    7: [7, 8, 9, 10, 11], // Subscription handler (Override to allow closing the subscription in case the client disconnects - keeps it unbounded -no backpressure-)
    8: [12, 13], // Failure handler
    9: [14, 15], // Completion handler
  }
  const currentHighlightedLines = stepHighlightedLines[currentStep] || [];
  return (
    <DevBcn2024.SlideTemplate slide={15} title='Quarkus: Streaming Server Sent Events'>
      <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <img
          style={{
            display: currentStep <= 2 ?'block' : 'none',
            position: 'absolute',
            maxWidth: '100%',
            transform: `scale(${currentStep === 2 ? 2.5 : 1.8}) translateX(${currentStep === 2 ? 280 : 0}px)`,
            transition: 'transform 1s ease-in-out'
          }}
          src={DevBcn2024.yakdArchitecture}
          alt='A diagram of the YAKD architecture for streaming'
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
                  subscription.request(Long.MAX_VALUE); // unbounded -> request with no backpressure
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
  9);
