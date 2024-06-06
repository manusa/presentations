import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2024, kubernetesComponentsDiagram} from '../../../components';


const Slide170 = ({currentStep}) => {
  // reflector.go 421-423
  // https://github.com/kubernetes/client-go/blob/b03e5b8438ce5abf36bac817490639abfbcd0441/tools/cache/reflector.go#L430-L432
  return (
    <DevBcn2024.SlideTemplate slide={17} title='Watching Kubernetes Resources with Fabric8 Kubernetes Client'>
      <div
        style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
        <img
          style={{
            display: currentStep <= 2 ? 'block' : 'none',
            position: 'absolute',
            top: 0, bottom: 0,
            transform: `scale(3) translateX(${currentStep === 2 ? -400 : 0}px)`,
            transition: 'transform 1s ease-in-out'
          }}
          src={DevBcn2024.yakdArchitecture}
          alt='A diagram of the YAKD architecture for streaming'
        />
        <div style={{display: currentStep > 2 && currentStep <= 6 ? 'block' : 'none'}}>
          <Code language='java'>{`
            // WatchableSubscriber.subscribe (simplified)
            kubernetesClient.pods().inAnyNamespace().watch(
              new ListOptionsBuilder().withTimeoutSeconds(DEFAULT_WATCHER_TIMEOUT_SECONDS + jitter).build(),
              new Watcher() {
                public void onClose() {
                  // ...
                }
                public void eventReceived(Action action, T resource) {
                  multiEmitter.emit(new WatchEvent<>(action, mapper.apply(resource)));
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
  `/presentations/${DevBcn2024.SLUG}/slide-180`,
  5);
