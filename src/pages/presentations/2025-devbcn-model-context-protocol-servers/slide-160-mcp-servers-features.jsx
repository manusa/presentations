import React from 'react';
import {ArcherContainer, ArcherElement} from 'react-archer';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const boxStyle = {
  display: 'flex', gap: '1rem', alignItems: 'center',
  margin: '1rem', padding: '1rem', borderRadius: '1rem', width: '20rem',
  background: DevBcn2025.BOX_BACKGROUND
};

const relation = {
  targetAnchor: 'left',
  sourceAnchor: 'right',
  style: {lineStyle: 'straight', strokeColor: DevBcn2025.ORANGE, strokeWidth: 2},
};

const Feature = ({faClass, title, active = false}) => {
  const overrides = {};
  if (active) {
    overrides.background = DevBcn2025.ORANGE + 'AA';
  }
  return (
    <div style={{...boxStyle, ...overrides}}>
      <i className={faClass} style={{color: DevBcn2025.BLUE_LIGHT}} />
      {title}
    </div>
  );
};

const Paper = ({children}) => (
  <div style={{
    display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem',
    borderRadius: '1rem', border: '2px dashed white',
  }}>
    {children}
  </div>
);

const Slide160 = ({currentStep}) => {
  return (
    <DevBcn2025.SlideTemplate slide={16} title='Implementing MCP Servers: Features'>
      <ArcherContainer style={{height: '100%'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr)) 1.8fr', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <ArcherElement
            id='mcp-server'
            relations={[
              {...relation, targetId: 'resources',},
              {...relation, targetId: 'prompts'},
              {...relation, targetId: 'tools',},
            ]}
          >
            <div style={boxStyle}>
              <DevBcn2025.Server style={{height: '4rem', fill: '#5BC2FF'}} />
              MCP Server
            </div>
          </ArcherElement>
          <div style={{display: 'flex', flexDirection: 'column', gap: '4rem', alignItems: 'center'}}>
            <ArcherElement id='resources'>
              <div><Feature title='Resources' faClass='fa-solid fa-globe' active={currentStep === 2} /></div>
            </ArcherElement>
            <ArcherElement id='prompts'>
              <div><Feature title='Prompts' faClass='fa-solid fa-terminal' active={currentStep === 3} /></div>
            </ArcherElement>
            <ArcherElement id='tools'>
              <div><Feature title='Tools' faClass='fa-solid fa-screwdriver-wrench' active={currentStep === 4} /></div>
            </ArcherElement>
          </div>
          <div>
            {currentStep === 2 && (
              <Paper>
                <pre style={{margin: '0'}}>{`devbcn://2025/sessions`}</pre>
                <pre style={{margin: '0', color: 'lime'}}>{`[{"id": "title": ...},...]`}</pre>
                <pre style={{margin: '0'}}>{`devbcn://2025/speakers`}</pre>
                <pre style={{margin: '0', color: 'lime'}}>{`[{"id": "name": ...},...]`}</pre>
                <pre style={{margin: '0'}}>{`devbcn://2025/speakers/{id}`}</pre>
                <pre style={{margin: '0', color: 'lime'}}>{`{"id": "name": ...}`}</pre>
                <pre style={{margin: '0'}}>{`doc://mcp/concepts/architecture`}</pre>
                <pre style={{margin: '0', color: 'lime'}}>{`## Core architecture...`}</pre>
                <pre style={{margin: '0'}}>{`doc://mcp/quickstart/server`}</pre>
                <pre style={{margin: '0', color: 'lime'}}>{`# Quickstart\\n## For Server Developers...`}</pre>
              </Paper>
            )}
            {currentStep === 3 && (
              <Paper>
                <pre style={{margin: '0'}}>{`/speaker $name`}</pre>
                <p style={{margin: '0', color: 'lime', fontSize: '1.7rem', fontFamily: 'monospace'}}>
                  Show me the biography of the DevBcn 2025 speaker named "Marc Nuri".
                  Include a list of their sessions.
                  Format in a legible way using just ascii.
                </p>

              </Paper>
            )}
            {currentStep === 4 && (
              <Paper>
                <pre style={{margin: '0'}}>{`weather_forecast($location)`}</pre>
                <pre style={{margin: '0'}}>{`devbcn_speaker_vote($speaker_id ,$rating)`}</pre>
                <pre style={{margin: '0'}}>{`pod_create($yaml)`}</pre>
                <pre style={{margin: '0'}}>{`pod_delete($namespace, $name)`}</pre>
              </Paper>
            )}
          </div>
        </div>
      </ArcherContainer>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide160,
  `/presentations/${DevBcn2025.SLUG}/slide-150-mcp-servers`,
  `/presentations/${DevBcn2025.SLUG}/slide-170-mcp-servers-language`,
  4);
