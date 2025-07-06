import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Slide220 = ({currentStep}) => {
  return (
    <DevBcn2025.SlideTemplate slide={22} title='Implementing MCP Servers: Metadata'>
      <div style={{position: 'fixed', left: '1rem', bottom: '1rem', fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.5rem'}}>
        https://blog.marcnuri.com/mcp-tool-annotations-introduction
      </div>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide220,
  `/presentations/${DevBcn2025.SLUG}/slide-220-mcp-servers-tool-budget`,
  `/presentations/${DevBcn2025.SLUG}/slide-240-q-a`,
  1);
