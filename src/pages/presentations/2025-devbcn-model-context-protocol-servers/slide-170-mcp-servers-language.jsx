import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const programmingLanguageSize = '12rem';
const ProgrammingLanguage = ({iconClass, children}) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '1rem', borderRadius: '2rem', width: programmingLanguageSize, height: programmingLanguageSize,
    background: DevBcn2025.BOX_BACKGROUND, color: DevBcn2025.ORANGE, fontSize: '2rem'
  }}>
    <i className={iconClass} style={{color: 'white', fontSize: '4rem'}}></i>
    {children}
  </div>
);

const InlineIcon = ({iconClass, style = {}}) => (
  <i className={iconClass} style={{color: DevBcn2025.BLUE_LIGHT, fontSize: '2rem', verticalAlign: 'middle', ...style}}></i>
);

const Slide170 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <DevBcn2025.SlideTemplate slide={17} title='Implementing MCP Servers: Programming language'>
      <div style={{display: 'flex', gap: '2rem', height: '100%', position: 'relative', alignItems: 'center'}}>
        <div className={classNameVisibleFrom(2)} style={{flex: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem'}}>
          <ProgrammingLanguage iconClass='fa-brands fa-golang'>Go</ProgrammingLanguage>
          <ProgrammingLanguage iconClass='fa-brands fa-js'>JavaScript</ProgrammingLanguage>
          <ProgrammingLanguage iconClass='fa-brands fa-java'>Java</ProgrammingLanguage>
          <ProgrammingLanguage iconClass='fa-brands fa-python'>Python</ProgrammingLanguage>
          <ProgrammingLanguage iconClass='fa-solid fa-gem'>Ruby</ProgrammingLanguage>
          <ProgrammingLanguage iconClass='fa-brands fa-rust'>Rust</ProgrammingLanguage>
          <ProgrammingLanguage iconClass='fa-brands fa-swift'>Swift</ProgrammingLanguage>
          <ProgrammingLanguage iconClass='fa-solid fa-question'>...</ProgrammingLanguage>
        </div>
        <div>
          <ul>
            <li className={classNameVisibleFrom(2)}>Libraries available for all mainstream languages
              <ul>
                <li>Official</li>
                <li>Community</li>
              </ul>
            </li>
            <li className={classNameVisibleFrom(3)}>Choose based on language ecosystem
              <ul>
                <li>
                  Kubernetes MCP Server&nbsp;
                  <InlineIcon iconClass='fa-brands fa-java'/> <InlineIcon iconClass='fa-solid fa-arrow-right' style={{fontSize: '1rem'}}/> <InlineIcon iconClass='fa-brands fa-golang'/>
                </li>
              </ul>
            </li>
            <li className={classNameVisibleFrom(4)}>Consider Distribution / Execution environment
              <ul>
                <li><InlineIcon iconClass='fa-brands fa-js'/> npx (<InlineIcon iconClass='fa-solid fa-desktop'/>)</li>
                <li><InlineIcon iconClass='fa-brands fa-python'/> uvx (<InlineIcon iconClass='fa-solid fa-desktop'/>)</li>
                <li><InlineIcon iconClass='fa-brands fa-docker' /> Docker/Podman (<InlineIcon iconClass='fa-solid fa-desktop'/>/<InlineIcon iconClass='fa-solid fa-globe'/>)</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div style={{position: 'fixed', left: '1rem', bottom: '1rem', fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.5rem'}}>
        https://github.com/manusa/kubernetes-mcp-server
      </div>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide170,
  `/presentations/${DevBcn2025.SLUG}/slide-160-mcp-servers-features`,
  `/presentations/${DevBcn2025.SLUG}/slide-180-mcp-servers-deployment-local`,
  4);
