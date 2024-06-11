import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2024, kubernetesComponentsDiagram} from '../../../components';


const Slide170 = ({currentStep}) => {
  // reflector.go 421-423
  // https://github.com/kubernetes/client-go/blob/b03e5b8438ce5abf36bac817490639abfbcd0441/tools/cache/reflector.go#L430-L432
  const stepHighlightedLines = {
    4: [3], // kubernetesClient.xxx().watch()
    5: [3],
    6: [3],
    7: [4], // Timeout and jitter
    8: [5, 6, 7, 8, 9, 10, 11, 12], // Watcher interface
  };
  const currentHighlightedLines = stepHighlightedLines[currentStep] || [];
  const stepResource = {
    5: 'apps().deployments()',
    6: 'services()'
  };
  const currentResource = stepResource[currentStep] ?? 'pods()';
  return (
    <DevBcn2024.SlideTemplate slide={17} title='Watching Kubernetes Resources with Fabric8 Kubernetes Client'>
      <div
        style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <DevBcn2024.YakdStreamDiagram
          style={{
            display: currentStep <= 2 ? 'block' : 'none',
            position: 'absolute',
            maxWidth: '100%',
            transform: `scale(2.5) translateX(${currentStep === 2 ? -320 : 50}px)`,
            transition: 'transform 1s ease-in-out'
          }}
        />
        <div style={{display: currentStep > 2 ? 'block' : 'none'}}>
          <Code
            language='java'
            useInlineStyles={false}
            lineProps={line => (currentHighlightedLines.includes(line) ? {class: 'devbcn-2024__code--highlighted'} : {})}
          >{`
            // WatchableSubscriber.subscribe (simplified)
            final var jitter = (long) (Math.random() * 9 + 1);
            kubernetesClient.${currentResource}.inAnyNamespace().watch(
              new ListOptionsBuilder().withTimeoutSeconds(DEFAULT_WATCHER_TIMEOUT_SECONDS + jitter).build(),
              new Watcher() {
                public void onClose() {
                  // ...self-healing logic
                }
                public void eventReceived(Action action, T resource) {
                  multiEmitter.emit(new WatchEvent<>(action, resource));
                }
              });
          `}</Code>
        </div>
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide170,
  `/presentations/${
    DevBcn2024.SLUG
  }/slide-160-quarkus-self-healing`,
  `/presentations/${DevBcn2024.SLUG}/slide-180-yakd-frontend`,
  8);
