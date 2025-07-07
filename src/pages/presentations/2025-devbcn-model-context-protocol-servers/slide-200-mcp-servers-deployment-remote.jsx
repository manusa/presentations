import React from 'react';
import {ArcherContainer, ArcherElement} from 'react-archer';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const boxStyle = {
  position: 'relative', display: 'flex', gap: '1rem', alignItems: 'center',
  margin: '1rem', padding: '1rem', borderRadius: '1rem', width: '20rem',
  background: DevBcn2025.BOX_BACKGROUND
};

const Slide200 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <DevBcn2025.SlideTemplate slide={20} title='Implementing MCP Servers: Deployment strategies 🌐'>
      <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <h2><i className='fa-solid fa-globe' /> Remote</h2>
        <div style={{
          flex: 1, display: 'flex', gap: '2rem', position: 'relative', alignItems: 'center', justifyContent: 'center'
        }}>
          <ArcherContainer>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5rem',}}>
              <DevBcn2025.EnvironmentBox environment={<><i className='fa-solid fa-desktop' /> Your Computer</>}>
                <ArcherElement id='mcp-client' relations={[{
                  sourceAnchor: 'bottom',
                  targetAnchor: 'top',
                  targetId: 'mcp-server',
                  style: {
                    lineStyle: 'straight', startMarker: true, strokeColor: DevBcn2025.ORANGE, strokeWidth: 2
                  },
                  label: <div style={{
                    padding: '0.25rem', fontSize: '1rem', background: DevBcn2025.ORANGE, color: 'black', textAlign: 'center', textWrap: 'nowrap'
                  }}>SSE / HTTP</div>
                }]}>
                  <div style={{...boxStyle, paddingTop: '2rem'}}>
                    <div style={{position: 'absolute', top: '0.5rem', width: '100%', fontSize: '1.5rem', textAlign: 'center', color: DevBcn2025.ORANGE}}>
                      AI Assistant
                    </div>
                    <DevBcn2025.Pci style={{height: '4rem', fill: '#5BC2FF'}} />
                    MCP Client
                  </div>
                </ArcherElement>
              </DevBcn2025.EnvironmentBox>
              <DevBcn2025.EnvironmentBox  position='bottom' environment={<><i className='fa-solid fa-globe' /> Remote Network</>}>
              <ArcherElement id='mcp-server'>
                  <div style={boxStyle}>
                    <DevBcn2025.Server style={{height: '4rem', fill: '#5BC2FF'}} />
                    MCP Server
                  </div>
                </ArcherElement>
              </DevBcn2025.EnvironmentBox>
            </div>
          </ArcherContainer>
          <div style={{'--li-bullet-content': '""'}}>
            <ul>
              <li className={classNameVisibleFrom(2)} style={{textDecoration: 'line-through'}}>⚙️ SSE-based communication</li>
              <li className={classNameVisibleFrom(2)}>⚙️ Streamable HTTP-based communication</li>
              <li className={classNameVisibleFrom(3)}>💪 Security management (OAuth)</li>
              <li className={classNameVisibleFrom(4)}>📁 NO Access to local resources</li>
              <li className={classNameVisibleFrom(5)}>✅ Accessible from remote Assistants</li>
            </ul>
          </div>
        </div>
      </div>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide200,
  `/presentations/${DevBcn2025.SLUG}/slide-190-mcp-servers-deployment-local`,
  `/presentations/${DevBcn2025.SLUG}/slide-210-mcp-servers-distribution`,
  5);
