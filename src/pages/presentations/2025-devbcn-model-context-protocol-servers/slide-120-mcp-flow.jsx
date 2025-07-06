import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const cellIdSteps = [
  {step: 2, cellId: 'user-prompt',},
  {step: 3, cellId: 'prompt-tool-context'},
  {step: 4, cellId: 'tool-call-request'},
  {step: 5, cellId: 'tool-invocation'},
  {step: 6, cellId: 'mcp-tool-call'},
  {step: 7, cellId: 'api-service-request'},
  {step: 8, cellId: 'api-service-response'},
  {step: 9, cellId: 'prompt-tool-results'},
  {step: 10, cellId: 'llm-final-response'},
];
const highlightLineColor = DevBcn2025.ORANGE;
const highlightTextColor = '#DD0000';

const Slide120 = ({currentStep}) => {
  let style = ``;
  for (const {cellId, step} of cellIdSteps) {
    if (currentStep === step) {
      style += `*[data-cell-id="${cellId}"] {
        path {fill: ${highlightLineColor} !important; stroke: ${highlightLineColor} !important; stroke-width: 6 !important;}
        rect {fill: ${highlightLineColor} !important;}
        text {fill: ${highlightTextColor} !important;}
      }`;
    }
  }
  return (
    <DevBcn2025.SlideTemplate slide={12} title='What is MCP?'>
      <style>{style}</style>
      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', alignItems: 'center'}}>
        <h2>AI Assistant MCP flow</h2>
        <DevBcn2025.McpSequenceDiagram style={{flex: 1, display: 'flex', alignItems: 'stretch', justifyContent: 'center', height: '100%', width: '100%', overflow: 'hidden'}} />
      </div>
      <div style={{position: 'fixed', left: '1rem', bottom: '1rem', fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.5rem'}}>
        https://modelcontextprotocol.io/introduction<br />
        https://blog.marcnuri.com/model-context-protocol-mcp-introduction
      </div>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide120,
  `/presentations/${DevBcn2025.SLUG}/slide-110-mcp-general-architecture`,
  `/presentations/${DevBcn2025.SLUG}/slide-130-mcp-standard`,
  10);
