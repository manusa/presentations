import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2025} from '../../../components';

const CellTool = ({children}) => (
  <DevBcn2025.Cell style={{padding: '0.5rem', fontFamily: 'monospace'}}>{children}</DevBcn2025.Cell>
);
const Cell = ({children}) => (
  <DevBcn2025.Cell style={{padding: '0.5rem'}}>{children}</DevBcn2025.Cell>
);
const Slide170 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <DevBcn2025.SlideTemplate slide={17} title='Implementing MCP Servers: Descriptions & Metadata'>
      {currentStep === 1 && (
        <div style={{'--pre-font-size': '1.4rem'}}>
          <h2>Tool Definition</h2>
          <Code
            language='json'
            useInlineStyles={false}
          >{`
          {
            "name": "weather_forecast",
            "description": "Get the weather forecast for a given location",
            "inputSchema": {
              "type": "object",
              "properties": {
                "location": {
                  "type": "string",
                  "description": "The location to get the weather for, use airport short code or city name, country (e.g. 'BCN', 'Barcelona, ES')"
                }
              },
              "required": ["location"]
            },
            "annotations": {
              "title": "🌤️ Weather Forecast",
              "readOnlyHint": true,
              "destructiveHint": false,
              "idempotentHint": true,
              "openWorldHint": true
            }
          }
          `}</Code>
        </div>
      )}
      <ul className={classNameVisibleFrom(2)}>
        <li>Tool <strong>descriptions</strong> are essential for <strong>LLMs</strong> to understand and use tools effectively</li>
        <ul>
          <li>Experiment with target models</li>
          <li>Experiment with different prompts</li>
        </ul>
        <li className={classNameVisibleFrom(3)}><strong>Annotations</strong> + metadata
          <ul>
            <li>Document for <strong>LLMs</strong> and <strong>end users</strong></li>
            <li>Assistant / Agent UX</li>
          </ul>
        </li>
      </ul>
      <table className={classNameVisibleFrom(4)} style={{width: '100%'}}>
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

export default slideControls(Slide170,
  `/presentations/${DevBcn2025.SLUG}/slide-160-mcp-servers-features`,
  `/presentations/${DevBcn2025.SLUG}/slide-180-mcp-servers-language`,
  4);
