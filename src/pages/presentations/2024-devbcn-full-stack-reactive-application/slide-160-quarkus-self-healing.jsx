import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2024} from '../../../components';

import 'highlight.js/styles/railscasts.css';

const Slide160 = ({currentStep}) => {
  const steps = {
    // Consumer<MultiEmitter> implementation,
    4: {
      hl: [2, 6, 7, 13]
    },
    // subscribe each watchable
    5: {
      hl: [4, 8],
      fabric8: 'lime'
    },
    // Graceful termination
    6: {
      hl: [9, 12],
      sse: 'red'
    },
    // Cancel upstream watchers
    7: {
      hl: [10, 11],
      fabric8: 'red',
      sse: 'red'
    },
    // async check emitter is still open
    9: {
      hl: [4],
      sse: 'red'
    },
    // watcher implementation
    10: {
      hl: [5, 6],
      fabric8Pod: 'lime'
    },
    // onClose
    11: {
      hl: [7, 13],
      fabric8Pod: 'red'
    },
    // Log close
    12: {
      hl: [8, 9],
      fabric8Pod: 'red'
    },
    // emit message to warn the subscriber
    13: {
      hl: [10],
      fabric8Pod: 'red',
      sse: 'lime'
    },
    // schedule a new subscription
    14: {
      hl: [11, 12],
      fabric8Pod: DevBcn2024.ORANGE
    },
    // Pipe any Kubernetes event downstream
    15: {
      hl: [14, 15, 16],
      fabric8: 'lime',
      sse: 'lime'
    }
  };
  const currentHighlightedLines = steps[currentStep]?.hl ?? [];
  const fabric8StrokeColor = steps[currentStep]?.fabric8 ?? '#FFFFFF';
  const fabric8PodStrokeColor = steps[currentStep]?.fabric8Pod ?? fabric8StrokeColor;
  const sseStrokeColor = steps[currentStep]?.sse ?? '#FFFFFF';
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
      <style>{`
          .devbcn-2024 .fabric8-path {
            stroke: ${fabric8StrokeColor} ;
          }
          .devbcn-2024 .fabric8-pod-path {
            stroke: ${fabric8PodStrokeColor} ;
          }
          .devbcn-2024 .sse-path {
            stroke: ${sseStrokeColor} ;
          }
        `}</style>
      <DevBcn2024.YakdMergeDiagram
        style={{
          display: currentStep > 2 ? 'flex' : 'none',
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          height: '18rem'
        }}/>
      <div
        style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <DevBcn2024.YakdStreamDiagram
          style={{
            display: currentStep <= 2 ? 'flex' : 'none',
            position: 'absolute', top: 0, bottom: 0,
            maxWidth: '100%',
            transform: `scale(2.5) translateX(${currentStep === 2 ? 50 : 280}px)`,
            transition: 'transform 1s ease-in-out'
          }}
        />
        <div style={{display: currentStep > 2 && currentStep <= 7 ? 'block' : 'none'}}>
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
        <div style={{display: currentStep > 7 ? 'block' : 'none'}}>
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
  15);
