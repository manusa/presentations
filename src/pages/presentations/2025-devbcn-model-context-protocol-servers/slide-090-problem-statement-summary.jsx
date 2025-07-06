import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Entry = ({Icon, title, children, ...properties}) => {
  return (
    <div style={{flex: '1 1 0', display: 'flex', flexDirection: 'column'}} {...properties}>
      <Icon style={{flexShrink: 0, margin: '6rem 0 3rem', height: '14rem', fill: DevBcn2025.ORANGE}} />
      <div style={{margin: '0 0 2rem', textAlign: 'center', background: DevBcn2025.BLUE}}>
        {title}
      </div>
      <div style={{fontSize: '2.5rem', paddingLeft: '0.5rem'}}>
        {children}
      </div>
    </div>
  );
};

const Slide090 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <DevBcn2025.SlideTemplate slide={9} title='Problem Statement - Summary'>
      <style>{"@keyframes appear {from {opacity: 0;} to {opacity: 1;}}"}</style>
      {currentStep >= 4 && <DevBcn2025.UsbC
        className={classNameVisibleFrom(4)}
        style={{
          position: 'absolute', left: '32%', top: 0, transform: 'translateX(-32%)', width: '20rem', fill: DevBcn2025.BLUE,
          animation: 'appear 1s ease-in-out'
        }}
      />}
      <div style={{display: 'flex', flexDirection: 'row', height: '100%', gap: '2rem'}}>
        <Entry
          className={classNameVisibleFrom(2)}
          Icon={DevBcn2025.LiveSignal}
          title='Real-Time Context'
        >
          <ul>
            <li>Access to real-time external-world data</li>
            <li>Responses accurate and up-to-date</li>
          </ul>
        </Entry>
        <Entry
          className={classNameVisibleFrom(3)}
          Icon={DevBcn2025.BotAssistant}
          title='Real Assistant'
        >
          <ul>
            <li>Interacts with real-world and external systems</li>
            <li>Performs actions on behalf of the user</li>
          </ul>
        </Entry>
        <Entry
          className={classNameVisibleFrom(5)}
          Icon={DevBcn2025.Puzzle}
          title='Specialized Tools'
        >
          <ul>
            <li>Tools for very specific tasks</li>
            <li>Private domain knowledge</li>
            <li>Reusability</li>
          </ul>
        </Entry>
      </div>
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide090,
  `/presentations/${DevBcn2025.SLUG}/slide-080-problem-statement-3-solved`,
  `/presentations/${DevBcn2025.SLUG}/slide-100-what-is-mcp`,
  5);
