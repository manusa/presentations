import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Bar = ({widthPercent, bgColor, text}) => (
  <div style={{
    width: widthPercent,
    backgroundColor: bgColor,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.5rem'
  }}>
    {text}
  </div>
);


const Slide230 = ({currentStep}) => {
  return (
    <DevBcn2025.SlideTemplate slide={23} title='Implementing MCP Servers: Tool budget - Context is limited'>
      <DevBcn2025.InnerSlide currentStep={currentStep} style={{padding: '1rem 0', gap: '3rem', justifyContent: 'space-evenly'}} >
        <DevBcn2025.McpSequenceDiagram style={{
          display: 'flex', height: '30vh', overflow: 'hidden'
        }} />
        <div>Every tool you expose takes part of the <strong>model context window</strong></div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', width: '80%'}}>
          <div style={{
            display: 'flex', height: '4rem', width: '100%', border: '2px solid ' + DevBcn2025.ORANGE, borderRadius: '0.5rem', overflow: 'hidden'
          }}>
            <Bar widthPercent='20%' bgColor='#33658a' text='SYSTEM PROMPT' />
            <Bar widthPercent='30%' bgColor='#1e3a5f' text='MCP TOOL DESCRIPTIONS' />
            <Bar widthPercent='25%' bgColor='#7fb3d5' text='USER PROMPT' />
            <Bar widthPercent='25%' bgColor='#FFFFFF66' />
          </div>
          <div style={{fontSize: '1rem', fontWeight: 'bold', textAlign: 'center'}}>CONTEXT WINDOW</div>
        </div>
      </DevBcn2025.InnerSlide>
      <DevBcn2025.InnerSlide currentStep={currentStep} style={{justifyContent: 'space-evenly'}} >
        <ul>
          <li>Context window is the maximum number of tokens the model can process at once</li>
          <li>A <strong>simple</strong> tool can cost <strong>~100-500 tokens</strong> (at least)</li>
          <li><strong>20</strong> tools can easily consume <strong>&gt; 5k tokens</strong></li>
        </ul>
        <table>
          <thead>
          <tr>
            <DevBcn2025.Header>Model Type</DevBcn2025.Header>
            <DevBcn2025.Header>Typical Context Window</DevBcn2025.Header>
            <DevBcn2025.Header>Impact of <strong>5k Token</strong> Toolset</DevBcn2025.Header>
          </tr>
          </thead>
          <tbody>
          <tr>
            <DevBcn2025.Cell><DevBcn2025.ChildReading style={{width: '1.8rem', fill: 'white'}}/> Small</DevBcn2025.Cell>
            <DevBcn2025.Cell>4k - 8k tokens</DevBcn2025.Cell>
            <DevBcn2025.Cell>
              😱 Consumes 60-100% of context.<br/>
              Little to no room left for the user's prompt or conversation history.
            </DevBcn2025.Cell>
          </tr>
          <tr>
            <DevBcn2025.Cell><DevBcn2025.Graduate style={{width: '1.8rem', fill: 'white'}}/> Large</DevBcn2025.Cell>
            <DevBcn2025.Cell>128k - 1M+ tokens</DevBcn2025.Cell>
            <DevBcn2025.Cell>✅ Consumes &lt;4% of context.<br/>
              Plenty of space remains for complex reasoning and long conversations.
            </DevBcn2025.Cell>
          </tr>
          </tbody>
        </table>
      </DevBcn2025.InnerSlide>
      <DevBcn2025.InnerSlide currentStep={currentStep} style={{justifyContent: 'flex-start'}}>
        <h2>Key Takeaways</h2>
        <ul style={{'--li-bullet-content': '""'}}>
          <li>🧰 You don’t need all your tools all the time (Client/User)</li>
          <li>🧹 Implement tools wisely to maximize utility without overwhelming the model</li>
          <li>✂️ Optimize Tool Definitions</li>
          <li>📏 Know Your Target Model</li>
          <li>🔄 Dynamic Loading</li>
        </ul>
      </DevBcn2025.InnerSlide>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide230,
  `/presentations/${DevBcn2025.SLUG}/slide-220-mcp-servers-model-size`,
  `/presentations/${DevBcn2025.SLUG}/slide-240-q-a`,
  4);
