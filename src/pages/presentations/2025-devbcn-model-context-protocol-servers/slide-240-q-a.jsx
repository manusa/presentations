import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Slide240 = ({currentStep}) => {
  return (
    <DevBcn2025.SlideTemplate slide={24} title='Q&A'>
      <div
        style={{
          position: 'absolute', bottom: 0, right: '2rem',
          padding: '2rem', background: DevBcn2025.BLUE, borderRadius: '2rem'
        }}
      >
        <DevBcn2025.FeedbackQr style={{display: 'flex', height: '20rem', padding: '0.5rem', borderRadius: '0.5rem', background: 'white'}} />
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
          Feedback ❤️
        </div>
      </div>
      <div style={{height: '100%', display: 'flex', gap: '0rem', alignItems: 'center'}}>
        <DevBcn2025.DevBcn
          style={{width: '30rem', fill: 'white', transform: 'rotate(270deg)'}}
          alt='An image of the DevBcn logo'
        />
        <div style={{flex: 1, fontSize: '20rem'}}>
          Q & A
        </div>
      </div>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide240,
  `/presentations/${DevBcn2025.SLUG}/slide-230-mcp-servers-tool-budget`,
  `/presentations/${DevBcn2025.SLUG}`,
  1);
