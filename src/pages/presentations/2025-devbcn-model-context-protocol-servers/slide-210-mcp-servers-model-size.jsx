import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Model = ({children}) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '1rem', padding: '2rem', borderRadius: '2rem', width: '15rem', height: '15rem',
    background: DevBcn2025.BOX_BACKGROUND, color: DevBcn2025.ORANGE, fontSize: '2rem', fill: 'white'
  }}>
    {children}
  </div>
);

const Slide210 = ({currentStep}) => {
  return (
    <DevBcn2025.SlideTemplate slide={21} title='Implementing MCP Servers: Model Size'>
      <DevBcn2025.InnerSlide currentStep={currentStep} style={{gap: '2rem', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Model>
          <DevBcn2025.ChildReading />
          Small
        </Model>
        <Model>
          <DevBcn2025.Graduate />
          Large
        </Model>
      </DevBcn2025.InnerSlide>
      <DevBcn2025.InnerSlide currentStep={currentStep}>
        <DevBcn2025.ChatGptUserMessage >Run a Pod with the container image "nginx" and expose port 80</DevBcn2025.ChatGptUserMessage>
      </DevBcn2025.InnerSlide>
      <DevBcn2025.InnerSlide currentStep={currentStep}>
        <h2><DevBcn2025.Graduate style={{width: '2rem', fill: 'white'}} /> Kubernetes Expert / LLM</h2>
      </DevBcn2025.InnerSlide>
      <DevBcn2025.InnerSlide currentStep={currentStep}>
        <div>
          <div style={{color: 'lime'}}><code>kubernetes_resource_create_or_update($resource)</code></div>
          <div style={{marginTop: '1rem', fontStyle: 'italic', fontSize: '2rem'}}>
            Create or update a Kubernetes resource in the current cluster by providing a YAML or JSON representation of the resource
          </div>
          <div style={{marginTop: '1rem', fontStyle: 'italic', fontSize: '2rem'}}>
            <span style={{color: 'lime'}}>$resource: </span>
            A JSON or YAML containing a representation of the Kubernetes resource. Should include top-level fields such as apiVersion, kind, metadata, and spec
          </div>
        </div>
      </DevBcn2025.InnerSlide>
      <DevBcn2025.InnerSlide currentStep={currentStep} style={{gap: '2rem', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Model>
          <DevBcn2025.ChildReading />
          ❌ Small
        </Model>
        <Model>
          <DevBcn2025.Graduate />
          ✅ Large
        </Model>
      </DevBcn2025.InnerSlide>
      <DevBcn2025.InnerSlide currentStep={currentStep}>
        <h2><DevBcn2025.ChildReading style={{width: '2.5rem', fill: 'white'}} /> English Speaker that can use tools / SLM (function calling)</h2>
      </DevBcn2025.InnerSlide>
      <DevBcn2025.InnerSlide currentStep={currentStep}>
        <div>
          <div style={{color: 'lime'}}><code>pods_run($image, $port)</code></div>
          <div style={{marginTop: '1rem', fontStyle: 'italic', fontSize: '2rem'}}>
            Run a Kubernetes Pod in the current or provided namespace with the provided container image and optional name
          </div>
          <div style={{marginTop: '1rem', fontStyle: 'italic', fontSize: '2rem'}}>
            <span style={{color: 'lime'}}>$image: </span>
            Container Image to run in the Pod
          </div>
          <div style={{marginTop: '1rem', fontStyle: 'italic', fontSize: '2rem'}}>
            <span style={{color: 'lime'}}>$port: </span>
            TCP/IP port to expose from the Pod container (Optional, no port exposed if not provided)
          </div>
        </div>
      </DevBcn2025.InnerSlide>
      <DevBcn2025.InnerSlide currentStep={currentStep} style={{gap: '2rem', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Model>
          <DevBcn2025.ChildReading />
          ✅ Small
        </Model>
        <Model>
          <DevBcn2025.Graduate />
          ✅ Large
        </Model>
      </DevBcn2025.InnerSlide>
      <div style={{position: 'fixed', left: '1rem', bottom: '1rem', fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.5rem'}}>
        https://blog.marcnuri.com/giving-superpowers-to-small-language-models-with-mcp
      </div>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide210,
  `/presentations/${DevBcn2025.SLUG}/slide-200-mcp-servers-distribution`,
  `/presentations/${DevBcn2025.SLUG}/slide-220-mcp-servers-tool-budget`,
  9);
