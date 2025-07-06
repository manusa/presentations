import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {Code, DevBcn2025} from '../../../components';

const CodeBlock = ({language='text', style, children}) => {
  return (
    <Code language={language} customStyle={{fontSize: '1.2rem', background: '#232323CC', overflow: 'hidden', ...style}}>
      {children}
    </Code>
  )
};

const FaBox = ({iconClass, subIconClass}) => (
  <div style={{position: 'relative'}}>
    <i className={iconClass} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', width: '18rem', height: '18rem',
      color: 'white', fontSize: '10rem', borderRadius: '3rem', background: DevBcn2025.BLUE
    }} />
    {subIconClass && <i className={subIconClass} style={{position: 'absolute', bottom: '1rem', right: '1rem', color: DevBcn2025.ORANGE}} /> }
  </div>
);

const IconTextContainer = ({children}) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
    width: '15rem', fontSize: '1.5rem', textAlign: 'center'
  }}>
    {children}
  </div>
);

const Slide200 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <DevBcn2025.SlideTemplate slide={20} title='Implementing MCP Servers: Distribution'>
      {/* Remote */}
      <DevBcn2025.InnerSlide currentStep={currentStep}>
        <FaBox iconClass='fa-solid fa-download' subIconClass='fa-solid fa-globe' />
        <CodeBlock language='json'>{`
           "mcpServers": {
              "github": {
                  "url": "https://api.githubcopilot.com/mcp/",
                  "requestInit": {
                      "headers": {
                          "Authorization": "Bearer YOUR_GITHUB_PAT"
                      }
                 }
              }
           }
        `}</CodeBlock>
      </DevBcn2025.InnerSlide>
      {/* Local */}
      <DevBcn2025.InnerSlide currentStep={currentStep}>
        <FaBox iconClass='fa-solid fa-download' subIconClass='fa-solid fa-desktop' />
      </DevBcn2025.InnerSlide>
      {/* PyPi / Python */}
      <DevBcn2025.InnerSlide currentStep={currentStep}>
        <div style={{display: 'flex', gap: '5rem', alignItems: 'center', justifyContent: 'center'}}>
          <FaBox iconClass='fa-brands fa-python' subIconClass='fa-solid fa-desktop' />
          <img alt='pypi' src={DevBcn2025.pythonPackageIndex} style={{
            height: '15rem', objectFit: 'contain'
          }} />
        </div>
        <CodeBlock>
          $ uvx kubernetes-mcp-server
        </CodeBlock>
        <CodeBlock language='json'>{`
           "mcpServers": {
              "kubernetes": {
                "command": "uvx",
                "args": ["kubernetes-mcp-server@latest"]
              }
            }
        `}</CodeBlock>
      </DevBcn2025.InnerSlide>
      {/* Npm / JavaScript */}
      <DevBcn2025.InnerSlide currentStep={currentStep}>
        <div style={{display: 'flex', gap: '5rem', alignItems: 'center', justifyContent: 'center'}}>
          <FaBox iconClass='fa-brands fa-js' subIconClass='fa-solid fa-desktop' />
          <img alt='npmjs' src={DevBcn2025.npm} style={{
            height: '10rem', objectFit: 'contain'
          }} />
        </div>
        <CodeBlock>
          $ npx kubernetes-mcp-server
        </CodeBlock>
        <CodeBlock language='json'>{`
           "mcpServers": {
              "kubernetes": {
                "command": "npx",
                "args": ["-y", "kubernetes-mcp-server@latest"]
              }
            }
        `}</CodeBlock>
      </DevBcn2025.InnerSlide>
      {/* Docker / Container Image */}
      <DevBcn2025.InnerSlide currentStep={currentStep}>
        <div style={{display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center'}}>
          <FaBox iconClass='fa-solid fa-question' subIconClass='fa-solid fa-desktop' />
          <IconTextContainer>
            <i className='fa-brands fa-docker' style={{fontSize: '10rem'}} />
            Docker Hub
          </IconTextContainer>
          <IconTextContainer>
            <DevBcn2025.GitHub style={{height: '10rem', fill: 'white'}} />
            GitHub Container Registry
          </IconTextContainer>
          <IconTextContainer>
            <img alt='npmjs' src={DevBcn2025.quay} style={{height: '10rem', objectFit: 'contain'}} />
            quay.io
          </IconTextContainer>
        </div>
        <CodeBlock>{`
          $ docker run quay.io/manusa/kubernetes_mcp_server
          $ podman run quay.io/manusa/kubernetes_mcp_server
        `}</CodeBlock>
        <CodeBlock language='json'>{`
           "mcpServers": {
              "kubernetes": {
                "command": "docker",
                "args": ["run", "quay.io/manusa/kubernetes_mcp_server"]
              }
            }
        `}</CodeBlock>
        <div>💪 Access to local resources is challenging</div>
      </DevBcn2025.InnerSlide>
      {/* BONUS !!! */}
      <DevBcn2025.InnerSlide currentStep={currentStep >= 7 ? 7 : currentStep}>
        <div style={{display: 'flex', gap: '5rem', alignItems: 'center', justifyContent: 'center'}}>
          <FaBox iconClass='fa-solid fa-question' subIconClass='fa-solid fa-gift' />
          <div>
            <ul>
              <li style={{display: 'flex', alignItems: 'center'}}>Kubernetes MCP Server is &nbsp; <i className='fa-brands fa-golang' style={{fontSize: '4rem'}}/></li>
              <ul>
                <li className={classNameVisibleFrom(8)}>Cross-compile to supported system platforms</li>
                <li className={classNameVisibleFrom(9)}>Create wrapper NPM and PyPi packages</li>
                <li className={classNameVisibleFrom(10)}>Publish to package repository</li>
              </ul>
            </ul>
          </div>
        </div>
      </DevBcn2025.InnerSlide>
      <div style={{position: 'fixed', left: '1rem', bottom: '1rem', fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.5rem'}}>
        https://github.com/manusa/kubernetes-mcp-server
      </div>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide200,
  `/presentations/${DevBcn2025.SLUG}/slide-190-mcp-servers-deployment-remote`,
  `/presentations/${DevBcn2025.SLUG}/slide-210-mcp-servers-model-size`,
  10);
