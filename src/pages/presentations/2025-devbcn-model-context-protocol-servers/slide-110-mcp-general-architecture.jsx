import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Slide110 = ({currentStep}) => {
  return (
    <DevBcn2025.SlideTemplate slide={11} title='What is MCP?'>
      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', alignItems: 'center'}}>
        <h2>General Architecture</h2>
        <div style={{flex: 1, overflow: 'hidden'}}>
          <img
            style={{objectFit: 'contain', width: '100%', height: '100%'}}
            src={DevBcn2025.whatIsMcp}
            alt='A diagram showing the general architecture of Model Context Protocol Servers'
          />
        </div>
      </div>
      <div style={{position: 'fixed', left: '1rem', bottom: '1rem', fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.5rem'}}>
        https://modelcontextprotocol.io/introduction<br />
        https://blog.marcnuri.com/model-context-protocol-mcp-introduction
      </div>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide110,
  `/presentations/${DevBcn2025.SLUG}/slide-100-what-is-mcp`,
  `/presentations/${DevBcn2025.SLUG}/slide-120-mcp-flow`,
  1);
