import React from 'react';
import {ArcherContainer, ArcherElement} from 'react-archer';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const boxStyle = {
  position: 'relative', display: 'flex', gap: '1rem', alignItems: 'center',
  margin: '1rem', padding: '1rem', borderRadius: '1rem', width: '20rem',
  background: DevBcn2025.BOX_BACKGROUND
};

const Slide190 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <DevBcn2025.SlideTemplate slide={19} title='Implementing MCP Servers: Deployment strategies 🖥️'>
      <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <h2><i className='fa-solid fa-desktop' /> Local</h2>
        <div style={{
          flex: 1, display: 'flex', gap: '2rem', position: 'relative', alignItems: 'center', justifyContent: 'center'
        }}>
          <ArcherContainer>
            <DevBcn2025.EnvironmentBox
              style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5rem'}}
              environment={<><i className='fa-solid fa-desktop' /> Your Computer</>}
            >
            <ArcherElement id='mcp-client' relations={[{
                sourceAnchor: 'bottom',
                targetAnchor: 'top',
                targetId: 'mcp-server',
                style: {
                  lineStyle: 'straight', startMarker: true, strokeColor: DevBcn2025.ORANGE, strokeWidth: 2
                },
                label: <div style={{padding: '0.25rem', fontSize: '1rem', background: DevBcn2025.ORANGE, color: 'black', textAlign: 'center'}}>STDIO</div>
              }]}>
                <div style={{...boxStyle, paddingTop: '2rem'}}>
                  <div style={{position: 'absolute', top: '0.5rem', width: '100%', fontSize: '1.5rem', textAlign: 'center', color: DevBcn2025.ORANGE}}>
                    AI Assistant
                  </div>
                  <DevBcn2025.Pci style={{height: '4rem', fill: '#5BC2FF'}} />
                  MCP Client
                </div>
              </ArcherElement>
              <ArcherElement id='mcp-server'>
                <div style={boxStyle}>
                  <DevBcn2025.Server style={{height: '4rem', fill: '#5BC2FF'}} />
                  MCP Server
                </div>
              </ArcherElement>
            </DevBcn2025.EnvironmentBox>
          </ArcherContainer>
          <div style={{'--li-bullet-content': '""'}}>
            <ul>
              <li className={classNameVisibleFrom(2)}>⚙️ STDIO-based communication (process)</li>
              <li className={classNameVisibleFrom(3)}>✅ Easier transport security management</li>
              <li className={classNameVisibleFrom(4)}>📁 Access to local resources</li>
              <li className={classNameVisibleFrom(5)}>⚠️ Supply-chain risks</li>
              <li className={classNameVisibleFrom(6)}>❌ NOT accessible from remote Assistants</li>
            </ul>
          </div>
        </div>
      </div>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide190,
  `/presentations/${DevBcn2025.SLUG}/slide-180-mcp-servers-language`,
  `/presentations/${DevBcn2025.SLUG}/slide-200-mcp-servers-deployment-remote`,
  6);
