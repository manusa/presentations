import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2024, kubernetesComponentsDiagram} from '../../../components';


const Slide160 = ({currentStep}) => {
  const visibleFrom = step => currentStep >= step;
  return (
    <DevBcn2024.SlideTemplate slide={16} title='Watching Kubernetes Resources with Fabric8 Kubernetes Client'>
      <Code language='java'>{`
        package io.fabric8.kubernetes.client.dsl;
        
        public interface Watchable<T> {
        
          Watch watch(ListOptions var1, Watcher<T> var2);
          
        }
      `}</Code>

      <Code language='java'>{`
  // WatchableSubscriber.subscribe (simplified)
  kubernetesClient.pods().inAnyNamespace().watch(
    new ListOptionsBuilder().withTimeoutSeconds(DEFAULT_WATCHER_TIMEOUT_SECONDS + jitter).build(),
    new Watcher() {
        public void eventReceived(Action action, T resource) {
          multiEmitter.emit(new WatchEvent<>(action, mapper.apply(resource)));
        }
    });
      `}</Code>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide160,
  `/presentations/${DevBcn2024.SLUG}/slide-150-quarkus-sse`,
  `/presentations/${DevBcn2024.SLUG}/slide-170`,
  5);
