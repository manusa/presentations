import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2024} from '../../../components';

const Slide220 = () => {
  return (
    <DevBcn2024.SlideTemplate slide={22} title='Q&A'>
      <div style={{height: '100%', display: 'flex', gap: '0rem', alignItems: 'center'}}>
        <DevBcn2024.DevBcn
          style={{width: '30rem', fill: 'white', transform: 'rotate(270deg)'}}
          alt='An image of the DevBcn logo'
        />
        <div style={{flex: 1, fontSize: '25rem'}}>
          Q & A
        </div>
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide220,
  `/presentations/${DevBcn2024.SLUG}/slide-210-reactive-applications-advantages`,
  `/presentations/${DevBcn2024.SLUG}/`);
