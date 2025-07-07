import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Model = ({Svg, children}) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '1rem', padding: '2rem', borderRadius: '2rem', width: '20rem', height: '20rem',
    background: DevBcn2025.BOX_BACKGROUND, color: DevBcn2025.ORANGE, fontSize: '1.8rem', fill: 'white',
    textAlign: 'center'
  }}>
    <Svg />
    {children}
  </div>
);

const Slide220 = ({currentStep}) => {
  return (
    <DevBcn2025.SlideTemplate slide={22} title='Implementing MCP Servers: Model Size'>
      <DevBcn2025.InnerSlide currentStep={currentStep} style={{gap: '2rem', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Model Svg={DevBcn2025.ChildReading}>Small Language Model</Model>
        <Model Svg={DevBcn2025.Graduate}>Large Language Model</Model>
      </DevBcn2025.InnerSlide>
      <DevBcn2025.InnerSlide currentStep={currentStep}>
        <DevBcn2025.ChatGptUserMessage >Run a Pod with the container image "nginx" and expose port 80</DevBcn2025.ChatGptUserMessage>
      </DevBcn2025.InnerSlide>
      <DevBcn2025.InnerSlide currentStep={currentStep} style={{justifyContent: 'space-evenly'}}>
        <h2 style={{display: 'flex', alignItems: 'center', gap: '2rem'}}><DevBcn2025.Graduate style={{width: '3rem', fill: 'white'}} /> Kubernetes Expert / LLM</h2>
        <h2 style={{display: 'flex', alignItems: 'center', gap: '2rem'}}><DevBcn2025.ChildReading style={{width: '3.5rem', fill: 'white'}} /> English Speaker that can use tools / SLM (function calling)</h2>
      </DevBcn2025.InnerSlide>
      <DevBcn2025.InnerSlide currentStep={currentStep} style={{gap: '4rem'}}>
        <DevBcn2025.ChatGptUserMessage >Run a Pod with the container image "nginx" and expose port 80</DevBcn2025.ChatGptUserMessage>
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
        <Model Svg={DevBcn2025.ChildReading}>❌ SLM</Model>
        <Model Svg={DevBcn2025.Graduate}>✅ LLM</Model>
      </DevBcn2025.InnerSlide>
      <DevBcn2025.InnerSlide currentStep={currentStep} style={{gap: '4rem'}}>
        <DevBcn2025.ChatGptUserMessage >Run a Pod with the container image "nginx" and expose port 80</DevBcn2025.ChatGptUserMessage>
        <div>
          <div style={{color: 'lime'}}><code>pods_run($image, $port)</code></div>
          <div style={{marginTop: '1rem', fontStyle: 'italic', fontSize: '2rem'}}>
            Run a Kubernetes Pod in the current namespace with the provided container image and optional port
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
        <Model Svg={DevBcn2025.ChildReading}>✅ SLM</Model>
        <Model Svg={DevBcn2025.Graduate}>✅ LLM</Model>
      </DevBcn2025.InnerSlide>
      <DevBcn2025.InnerSlide currentStep={currentStep}>
        <ul>
          <li>Use MCP to encapsulate the task complexity</li>
          <li>Reduce costs by being able to use smaller models</li>
          <li>Enable edge devices to run AI Assistants with limited resources</li>
        </ul>
      </DevBcn2025.InnerSlide>
      <div style={{position: 'fixed', left: '1rem', bottom: '1rem', fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.5rem'}}>
        https://blog.marcnuri.com/giving-superpowers-to-small-language-models-with-mcp
      </div>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide220,
  `/presentations/${DevBcn2025.SLUG}/slide-210-mcp-servers-distribution`,
  `/presentations/${DevBcn2025.SLUG}/slide-230-mcp-servers-tool-budget`,
  9);
