import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Box = ({icon, title}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly',
    background: DevBcn2025.ORANGE + 'CC', width: '12rem', height: '12rem', borderRadius: '0.5rem'
  }}>
    <div style={{fontSize: '3rem'}}>{icon}</div>
    <div style={{color: 'black', fontSize: '1.5rem', textAlign: 'center'}}>{title}</div>
  </div>
);

const Slide150 = () => {
  return (
    <DevBcn2025.TitleTemplate
      slide={15}
      title='Implementing MCP Servers'
      subtitle={DevBcn2025.TITLE}
    >
      <div style={{height: '25vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
        <Box icon='✨' title='Features' />
        <Box icon='🏷️' title='Descriptions & Metadata' />
        <Box icon='🧑‍💻' title='Programming Language' />
        <Box icon='🚀' title='Deployment Strategies' />
        <Box icon='📦' title='Distribution' />
        <Box icon='🧠' title='Model Size (SLM vs LLM)' />
        <Box icon='🧰' title='Tool Budget' />
      </div>
    </DevBcn2025.TitleTemplate>
  );
};

export default slideControls(Slide150,
  `/presentations/${DevBcn2025.SLUG}/slide-140-mcp-timeline`,
  `/presentations/${DevBcn2025.SLUG}/slide-160-mcp-servers-features`,
  1);
