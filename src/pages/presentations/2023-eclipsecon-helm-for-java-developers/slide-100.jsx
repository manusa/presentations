import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {EclipseCon2023, JKubeLogo} from '../../../components';
import dukeKubernetesSurf from '../../../components/2023-eclipsecon-helm-for-java-developers/assets/duke-kubernetes-surf-sc.png';

const Cell = ({children}) =>
  <div style={{display: 'flex', flexDirection: 'column', maxHeight: '100%'}}>{children}</div>;


const CellTitle = ({icon, children}) =>
  <h3 style={{display: 'flex', padding: '0 1rem', color: '#f79422'}}>
    <span className={icon} /><span style={{flex: 1, textAlign: 'center'}}>{children}</span>
  </h3>;

const CellContent = ({style, children}) =>
  <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', ...style}}>
    {children}
  </div>;

const Slide100 = () => {
  return (
    <EclipseCon2023.SlideTemplate slide={10} title='What is Eclipse JKube?'>
      <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        <JKubeLogo textColor='#FFF' style={{height: '30vh'}}/>
        <div style={{flex: 1, display: 'grid', gridAutoFlow: 'column', gridAutoColumns: '1fr', gap: '3rem', minHeight: 0}}>
          <Cell>
            <CellTitle icon='fa-solid fa-wrench'>Tools and Plugins</CellTitle>
            <CellContent>
              <div style={{textAlign: 'center'}}>
                <p>Generate container images</p>
                <p>Generate and deploy configuration manifests</p>
                <p>Much more</p>
              </div>
            </CellContent>
          </Cell>
          <Cell>
            <CellTitle icon='fa-solid fa-laptop-code'>Deploy Java on K8s</CellTitle>
            <CellContent style={{borderLeft: '1px dashed #555', borderRight: '1px dashed #555'}}>
              <img
                src={dukeKubernetesSurf}
                style={{objectFit: 'contain', maxHeight: '50%', maxWidth: '50%'}}
                alt='A picture of Java mascot (Duke) surfing'
              />
            </CellContent>
          </Cell>
          <Cell>
            <CellTitle icon='fa-solid fa-layer-group'>Components</CellTitle>
            <CellContent>
              <table>
                <thead><tr><th>JKube Kit</th></tr></thead>
                <tbody>
                  <tr><td>Kubernetes Maven/Gradle Plugin</td></tr>
                  <tr><td>OpenShift Maven/Gradle Plugin</td></tr>
                </tbody>
              </table>
            </CellContent>
          </Cell>
        </div>
      </div>
    </EclipseCon2023.SlideTemplate>
  );
};

export default slideControls(Slide100,
  `/presentations/${EclipseCon2023.SLUG}/slide-090`,
  `/presentations/${EclipseCon2023.SLUG}/slide-110`);
