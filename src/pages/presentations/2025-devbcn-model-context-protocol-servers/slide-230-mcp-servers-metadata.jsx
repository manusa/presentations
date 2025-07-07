import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const CellTool = ({children}) => (
  <DevBcn2025.Cell style={{padding: '0.5rem', fontFamily: 'monospace'}}>{children}</DevBcn2025.Cell>
);
const Cell = ({children}) => (
  <DevBcn2025.Cell style={{padding: '0.5rem'}}>{children}</DevBcn2025.Cell>
);
const Slide220 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <DevBcn2025.SlideTemplate slide={23} title='Implementing MCP Servers: Descriptions & Metadata'>
      <ul>
        <li>Tool <strong>descriptions</strong> are essential for <strong>LLMs</strong> to understand and use tools effectively</li>
        <ul>
          <li>Experiment with target models</li>
          <li>Experiment with different prompts</li>
        </ul>
        <li className={classNameVisibleFrom(2)}><strong>Annotations</strong> + metadata
          <ul>
            <li>Document for <strong>LLMs</strong> and <strong>end users</strong></li>
            <li>Assistant / Agent UX</li>
          </ul>
        </li>
      </ul>
      <table className={classNameVisibleFrom(3)} style={{width: '100%'}}>
        <thead>
        <tr><DevBcn2025.Header>Annotation</DevBcn2025.Header><DevBcn2025.Header>Description</DevBcn2025.Header></tr>
        </thead>
        <tbody>
        <tr><CellTool>title</CellTool><Cell>Human-readable title for UI</Cell></tr>
        <tr><CellTool>readOnlyHint</CellTool><Cell>Tool doesn't make modifications</Cell></tr>
        <tr><CellTool>destructiveHint</CellTool><Cell>Tool can perform destructive operations</Cell></tr>
        <tr><CellTool>idempotentHint</CellTool><Cell>Tool can be safely retried</Cell></tr>
        <tr><CellTool>openWorldHint</CellTool><Cell>Tool interacts with external systems</Cell></tr>
        </tbody>
      </table>
      <div style={{position: 'fixed', left: '1rem', bottom: '1rem', fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.5rem'}}>
        https://blog.marcnuri.com/mcp-tool-annotations-introduction
      </div>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide220,
  `/presentations/${DevBcn2025.SLUG}/slide-220-mcp-servers-tool-budget`,
  `/presentations/${DevBcn2025.SLUG}/slide-240-q-a`,
  3);
