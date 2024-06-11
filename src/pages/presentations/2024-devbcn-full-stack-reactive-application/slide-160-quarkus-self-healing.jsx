import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2024} from '../../../components';

import 'highlight.js/styles/railscasts.css';

const Slide160 = ({currentStep}) => {
  const stepHighlightedLines = {
    4: [2, 6, 7, 13], // Consumer<MultiEmitter> implementation,
    5: [4, 8], // subscribe each watchable
    6: [9, 10, 11, 12], // Graceful termination
    8: [4], // async check emitter is still open
    9: [5, 6], // watcher implementation
    10: [7, 13], // onClose
    11: [8, 9], // Log it
    12: [10], // emit message to warn the subsrciber
    13: [11, 12], // schedule a new subscription
    14: [14, 15, 16] // Pipe any Kubernetes event downstream
  }
  const currentHighlightedLines = stepHighlightedLines[currentStep] || [];
  return (
    <DevBcn2024.SlideTemplate slide={16} title='Quarkus: Embracing failure'>
      <DevBcn2024.SelfHealingIcon
        style={{
          display: currentStep > 2 ? 'flex' : 'none',
          position: 'absolute',
          fill: DevBcn2024.ORANGE,
          right: '2rem',
          bottom: 0,
          height: '15rem'
        }}
      />
      <div
        style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <DevBcn2024.YakdStreamDiagram
          style={{
            display: currentStep <= 2 ? 'block' : 'none',
            position: 'absolute',
            maxWidth: '100%',
            transform: `scale(2.5) translateX(${currentStep === 2 ? 50 : 280}px)`,
            transition: 'transform 1s ease-in-out'
          }}
        />
        <div style={{display: currentStep > 2 && currentStep <= 6 ? 'block' : 'none'}}>
          <Code
            language='java'
            useInlineStyles={false}
            lineProps={line => (currentHighlightedLines.includes(line) ? {class: 'devbcn-2024__code--highlighted'} : {})}
          >{`
            // com.marcnuri.yakd.watch.SelfHealingWatchableEmitter simplified
            public class SelfHealingWatchableEmitter implements Consumer<MultiEmitter<? super WatchEvent<?>>> {
            
              private final List<Watchable<?>> watchables;
              
              @Override
              public void accept(MultiEmitter<? super WatchEvent<?>> emitter) {
                watchables.forEach(watchable -> executorService.execute(() -> subscribe(watchable, emitter)));
                emitter.onTermination(() -> {
                  LOG.debug("WatchEvent emitter stopped downstream, cleaning all resources");
                  activeWatches.values().forEach(Closeable::close);
                });
              }
              // ...
            }
          `}</Code>
        </div>
        <div style={{display: currentStep > 6 ? 'block' : 'none'}}>
          <Code
            language='java'
            useInlineStyles={false}
            lineProps={line => (currentHighlightedLines.includes(line) ? {class: 'devbcn-2024__code--highlighted'} : {})}
          >{`
            // com.marcnuri.yakd.watch.SelfHealingWatchableEmitter simplified
            private void subscribe(Watchable<?> watchable, MultiEmitter<? super WatchEvent<?>> emitter) {
              // pseudo-code
              if (!emitter.isCancelled()) {
                watchable.watch(new Fabric8Watcher() {
                  // com.marcnuri.yakd.watch.WatchableSubscriber$WatchEventEmitter simplified
                  void onClose() {
                    LOG.debug("Watchable {} stopped, self healing with delay of {} seconds",
                      watchable.getType(), watchable.getSelfHealingDelay().getSeconds());
                    emitter.emit(new WatchEvent<>(Watcher.Action.ERROR, new RequestRestartError(watchable, throwable)));
                    executorService.schedule(() ->
                      subscribe(watchable, emitter), watchable.getSelfHealingDelay().getSeconds(), TimeUnit.SECONDS);
                  }
                  void eventReceived(Action action, T resource) {
                    emitter.emit(new WatchEvent<>(action, resource));
                  }
                });
            }
          `}</Code>
        </div>
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide160,
  `/presentations/${DevBcn2024.SLUG}/slide-150-quarkus-sse`,
  `/presentations/${DevBcn2024.SLUG}/slide-170-watching-kubernetes-resources`,
  14);
