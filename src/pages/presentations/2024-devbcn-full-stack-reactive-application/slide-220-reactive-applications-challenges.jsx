import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import { DevBcn2024} from '../../../components';

const Entry = ({Icon, title, children, ...properties}) => {
  return (
    <div style={{flex: '1 1 0', display: 'flex', flexDirection: 'column'}} {...properties}>
      <Icon style={{margin: '6rem 0', height: '14rem', fill: DevBcn2024.ORANGE}} />
      <div style={{margin: '0 0 2rem', textAlign: 'center', background: DevBcn2024.BLUE}}>
        {title}
      </div>
      <div style={{fontSize: '2.5rem', paddingLeft: '0.5rem'}}>
        {children}
      </div>
    </div>
  );
};

const Slide220 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <DevBcn2024.SlideTemplate slide={22} title='Tradeoffs and Challenges'>
      <div style={{display: 'flex', flexDirection: 'row', height: '100%', gap: '2rem'}}>
        <Entry
          className={classNameVisibleFrom(2)}
          Icon={DevBcn2024.ComplexIcon}
          title='Complexity in Design'
        >
          <ul>
            <li>Careful planning</li>
            <li>Increased development time</li>
          </ul>
        </Entry>
        <Entry
          className={classNameVisibleFrom(3)}
          Icon={DevBcn2024.DebuggingIcon}
          title='Debugging & Monitoring'
        >
          <ul>
            <li>Asynchronous</li>
            <li>Need for special tools</li>
          </ul>
        </Entry>
        <Entry
          className={classNameVisibleFrom(4)}
          Icon={DevBcn2024.LearningCurveIcon}
          title='Learning Curve'
        >
          <ul>
            <li>New paradigm</li>
            <li>Training + adaptation</li>
          </ul>
        </Entry>
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide220,
  `/presentations/${DevBcn2024.SLUG}/slide-210-reactive-applications-advantages`,
  `/presentations/${DevBcn2024.SLUG}/slide-230-q-a`,
  4
);
