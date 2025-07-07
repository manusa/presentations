import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Slide020 = () => {
  return (
    <DevBcn2025.SlideTemplate slide={2} title='Agenda'>
      <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        <div style={{
          marginTop: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          fontFamily: '\'Orbitron\', sans-serif',
          fontSize: '5rem',
          textShadow: '0rem -0.5rem 0.9rem #FFFFFF66'
        }}>
          Model Context Protocol Servers 101
        </div>
        <div style={{flex: 1, display: 'flex', gap: '0rem', alignItems: 'center'}}>
          <DevBcn2025.DevBcn
            style={{width: '30rem', fill: 'white', transform: 'rotate(270deg)'}}
            alt='An image of the DevBcn logo'
          />
          <ul style={{flex: 1}}>
            <li>Problem statement</li>
            <li>What is MCP?</li>
            <li>
              Implementing Model Context Protocol Servers
              <ul style={{'--li-bullet-content': '""'}}>
                <li>✨ Features / 🏷️ Descriptions & Metadata</li>
                <li>🧑‍💻 Programming language</li>
                <li>🚀 Deployment strategies / 📦 Packaging & Distribution</li>
                <li>🧠 Model size / 🧰 Tool Budget </li>
              </ul>
            </li>
            <li>Q&A</li>
          </ul>
        </div>
      </div>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide020,
  `/presentations/${DevBcn2025.SLUG}/slide-010-about`,
  `/presentations/${DevBcn2025.SLUG}/slide-030-problem-statement-1`);
