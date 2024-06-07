import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2024} from '../../../components';

const Slide090 = () => {
  return (
    <DevBcn2024.SlideTemplate slide={9} title='Yet Another Kubernetes Dashboard (YAKD)'>
      <div style={{display: 'flex', gap: '2rem'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', width: '80rem'}}>
          <img src={DevBcn2024.yakdHome} alt='YAKD Home Screenshot'/>
        </div>
        <ul style={{display: 'flex', flexDirection: 'column', gap: '4rem', justifyContent: 'space-between'}}>
          <li>Kubernetes Dashboard</li>
          <li>Free Open Source</li>
          <li>Began as a quickstart example</li>
          <li>Same features as most dashboards</li>
          <li>Search (Reactive)</li>
        </ul>
      </div>
      <div style={{position: 'fixed', left: '2rem', bottom: '1rem', fontSize: '2.5rem', color: 'white'}}>
        github.com/manusa/yakd
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide090,
  `/presentations/${DevBcn2024.SLUG}/slide-080-yakd-case-study`,
  `/presentations/${DevBcn2024.SLUG}/slide-100-yakd-architecture`);
