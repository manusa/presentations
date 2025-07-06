import React from 'react';
import {ArcherContainer, ArcherElement} from 'react-archer';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const relation = (label = 'Custom API') => ({
  targetAnchor: 'top',
  sourceAnchor: 'bottom',
  style: {lineStyle: /*'angle'*/'straight', startMarker: true, strokeColor: DevBcn2025.ORANGE, strokeWidth: 2},
  label: <div style={{padding: '0.25rem', fontSize: '1rem', background: DevBcn2025.ORANGE, color: 'black', textAlign: 'center'}}>{label}</div>,
});

const Entry = ({Icon, title, fill = '#FFFFFF', ...properties}) => (
  <div style={{flex: '1 1 0', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10rem'}} {...properties}>
    <Icon style={{flexShrink: 0, margin: '0.5rem', height: '4rem', fill}} />
    <div style={{padding: '0.25rem 0.5rem', marginBottom: '0.5rem', textAlign: 'center', fontSize: '1.5rem', background: DevBcn2025.BLUE}}>
      {title}
    </div>
  </div>
);

const Slide130 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <DevBcn2025.SlideTemplate slide={13} title='What is MCP?'>
      <div style={{display: 'flex', gap: '1rem', height: '100%', alignItems: 'stretch', justifyContent: 'space-evenly'}}>
        <div>
          <h2 style={{textAlign: 'center'}}>Before MCP</h2>
          <ArcherContainer>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15rem', alignItems: 'center'}}>
              <div style={{display: 'flex', gap: '2rem'}}>
                <ArcherElement
                  id='claude'
                  relations={[
                    {...relation(), targetId: 'github'},
                    {...relation(), targetId: 'file-system'},
                    {...relation(), targetId: 'slack', label: null},
                  ]}
                >
                  <div><Entry Icon={DevBcn2025.ClaudeLogo} title='Claude' /></div>
                </ArcherElement>
                <ArcherElement
                  id='assistant-x'
                  relations={[
                    {...relation(), targetId: 'github', label: null},
                    {...relation(), targetId: 'file-system'},
                    {...relation(), targetId: 'slack'},
                  ]}
                >
                  <div><Entry Icon={DevBcn2025.Llm} title='Assistant X' /></div>
                </ArcherElement>
              </div>
              <div style={{display: 'flex', gap: '2rem'}}>
                <ArcherElement id='github'>
                  <div><Entry Icon={DevBcn2025.GitHub} title='GitHub' /></div>
                </ArcherElement>
                <ArcherElement id='file-system'>
                  <div><Entry Icon={DevBcn2025.FileSystem} title='FileSystem' /></div>
                </ArcherElement>
                <ArcherElement id='slack'>
                  <div><Entry Icon={DevBcn2025.Slack} title='Slack' /></div>
                </ArcherElement>
              </div>
            </div>
          </ArcherContainer>
        </div>
        <div className={classNameVisibleFrom(2)}>
          <h2 style={{textAlign: 'center'}}>After MCP</h2>
          <ArcherContainer>
            <div style={{display: 'flex', flexDirection: 'column', gap: '8.5rem', alignItems: 'center'}}>
              <div style={{display: 'flex', gap: '2rem'}}>
                <ArcherElement
                  id='claude'
                  relations={[
                    {...relation('Unified API'), targetId: 'mcp'}
                  ]}
                >
                  <div><Entry Icon={DevBcn2025.ClaudeLogo} title='Claude' /></div>
                </ArcherElement>
                <ArcherElement
                  id='assistant-x'
                  relations={[
                    {...relation('Unified API'), targetId: 'mcp'}
                  ]}
                >
                  <div><Entry Icon={DevBcn2025.Llm} title='Assistant X' /></div>
                </ArcherElement>
              </div>
              <ArcherElement
                id='mcp'
                relations={[
                  {...relation(), targetId: 'github',},
                  {...relation(), targetId: 'file-system'},
                  {...relation(), targetId: 'slack',},
                ]}
              >
                <div><Entry Icon={DevBcn2025.Mcp} fill='none' title='MCP' /></div>
              </ArcherElement>
              <div style={{display: 'flex', gap: '2rem'}}>
                <ArcherElement id='github'>
                  <div><Entry Icon={DevBcn2025.GitHub} title='GitHub' /></div>
                </ArcherElement>
                <ArcherElement id='file-system'>
                  <div><Entry Icon={DevBcn2025.FileSystem} title='FileSystem' /></div>
                </ArcherElement>
                <ArcherElement id='slack'>
                  <div><Entry Icon={DevBcn2025.Slack} title='Slack' /></div>
                </ArcherElement>
              </div>
            </div>
          </ArcherContainer>
        </div>
      </div>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide130,
  `/presentations/${DevBcn2025.SLUG}/slide-120-mcp-flow`,
  `/presentations/${DevBcn2025.SLUG}/slide-140-mcp-timeline`,
  2);
