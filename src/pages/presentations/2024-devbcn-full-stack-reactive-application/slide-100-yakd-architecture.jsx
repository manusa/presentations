import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2024} from '../../../components';

const Slide100 = () => {
  return (
    <DevBcn2024.SlideTemplate slide={10} title='YAKD Architecture'>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <DevBcn2024.YakdArchitectureSimplifiedDiagram style={{flex: 1}} />
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide100,
  `/presentations/${DevBcn2024.SLUG}/slide-090-yakd-introduction`,
  `/presentations/${DevBcn2024.SLUG}/slide-110-yakd-reactive`);
