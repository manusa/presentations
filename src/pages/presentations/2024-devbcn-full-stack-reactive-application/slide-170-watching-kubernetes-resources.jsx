import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2024, kubernetesComponentsDiagram} from '../../../components';


const Slide170 = ({currentStep}) => {
  // reflector.go 421-423
  // https://github.com/kubernetes/client-go/blob/b03e5b8438ce5abf36bac817490639abfbcd0441/tools/cache/reflector.go#L430-L432
  const steps = {
    // kubernetesClient.xxx().watch()
    4: {
      hl: [3],
      fabric8Pod: 'lime'
    },
    5: {
      hl: [3],
      stepResource: 'apps().deployments()',
      fabric8Deployment: 'lime'
    },
    6: {
      hl: [3],
      stepResource: 'services()',
      fabric8: 'lime'
    },
    // Timeout and jitter
    7: {
      hl: [4],
      fabric8Pod: DevBcn2024.ORANGE
    },
    // Watcher interface
    8: {
      hl: [5, 6, 7, 8, 9, 10, 11, 12],
      sse: 'lime',
      fabric8: 'lime'
    }
  };
  const currentHighlightedLines = steps[currentStep]?.hl ?? [];
  const fabric8StrokeColor = steps[currentStep]?.fabric8 ?? '#FFFFFF';
  const fabric8PodStrokeColor = steps[currentStep]?.fabric8Pod ?? fabric8StrokeColor;
  const fabric8DeploymentStrokeColor = steps[currentStep]?.fabric8Deployment ?? fabric8StrokeColor;
  const sseStrokeColor = steps[currentStep]?.sse ?? '#FFFFFF';
  const currentResource = steps[currentStep]?.stepResource ?? 'pods()';
  return (
    <DevBcn2024.SlideTemplate slide={17} title='Watching Kubernetes Resources with Fabric8 Kubernetes Client'>
      <DevBcn2024.Fabric8Icon
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
            stroke: ${fabric8StrokeColor};
          }
          .devbcn-2024 .fabric8-pod-path {
            stroke: ${fabric8PodStrokeColor};
          }
          .devbcn-2024 .fabric8-deployment-path {
            stroke: ${fabric8DeploymentStrokeColor};
          }
          .devbcn-2024 .sse-path {
            stroke: ${sseStrokeColor};
          }
        `}</style>
      <DevBcn2024.YakdMergeDiagram
        style={{
          display: currentStep > 2 ? 'flex' : 'none',
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          height: '15rem'
        }}/>
      <div
        style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <DevBcn2024.YakdStreamDiagram
          style={{
            display: currentStep <= 2 ? 'flex' : 'none',
            position: 'absolute', top: 0, bottom: 0,
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
