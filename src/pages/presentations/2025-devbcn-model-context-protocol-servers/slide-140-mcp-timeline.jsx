import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const containerWidth = '80vw';
const dotSize = '25px';
const lineHeight = '5px';
const activeColor = DevBcn2025.ORANGE;
const inactiveColor = '#AEB6BF'

// https://codepen.io/cjl750/pen/mXbMyo (JS-Based - this one)
// https://codepen.io/cjl750/pen/MXvYmg (CSS-Based)
const TimeLineDot = ({yearMonth, event, active=false}) => (
  <div
    className={`timeline-dot ${active ? 'timeline-dot--active' : ''}`}
    data-description={yearMonth}
    style={{
      width: dotSize,
      height: dotSize,
      backgroundColor: active ? activeColor : inactiveColor,
      position: 'relative',
      borderRadius: '50%',
      display: 'block',
      appearance: 'none',
    }}
  >
    <span
      className={`timeline-dot-info`}
      data-year-month={yearMonth}
      data-event={event}
      style={{
        width: '1px',
        height: '1px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        visibility: 'hidden'
      }}
    />
  </div>
);

const dots = [
  {yearMonth: '2024-11', step: 2, event: 'Anthropic announcement\nVersion 2024-11-05'},
  {yearMonth: '2024-12', step: 3, event: 'Community integration:\nGitHub, YouTube'},
  {yearMonth: '2025-01', step: 4},
  {yearMonth: '2025-02', step: 4, event: 'MCP server boom'},
  {yearMonth: '2025-03', step: 5, event: 'Version 2025-03-26'},
  {yearMonth: '2025-04', step: 6, event: 'OpenAI, Google, Microsoft, add MCP support'},
  {yearMonth: '2025-05', step: 7, event: 'Windows 11 native MCP support'},
  {yearMonth: '2025-06', step: 8, event: 'Version 2025-06-18'}
];

const Slide140 = ({currentStep}) => {
  return (
    <DevBcn2025.SlideTemplate slide={14} title='What is MCP?'>
      <style>{`
        .devbcn-2025 .timeline-dot {
          &::before, &::after {
            content: '';
            display: block;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: ${inactiveColor};
            width: calc(${containerWidth} / ${dots.length});
            height: ${lineHeight};
            z-index: -1;
          }
          &::before {
            left: calc(-1 * (${containerWidth} / ${dots.length}) + (${dotSize} / 2));
          }
          &::after {
            right: calc(-1 * (${containerWidth} / ${dots.length}) + (${dotSize} / 2));
          }
          &.timeline-dot--active::before, &.timeline-dot--active::after {
            background-color: ${activeColor};
          }
          & .timeline-dot-info {
            &::before, &::after {
              visibility: visible;
              position: absolute;
              left: 50%;
            }
            &::after {
              content: attr(data-year-month);
              top: 5rem;
              width: 11rem;
              transform: translateX(-90%) rotateZ(-45deg);
              text-align: right;
            }
            &::before {
              content: attr(data-event);
              font-size: 1.8rem;
              top: -15rem;
              width: 25rem;
              transform: translateX(-10%) rotateZ(-45deg);
            }
          }
          &.timeline-dot--active .timeline-dot-info {
            color: ${activeColor};
          }
        }
      `}</style>
      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', alignItems: 'center'}}>
        <h2>MCP Timeline</h2>
        <div style={{flex: 1, width: '100%', overflow: 'hidden'}}>
          <div /* timeline container*/ style={{
            display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'relative',
            margin: '0 auto', top: '50%', width: containerWidth
          }} >
            {dots.map((dot, idx) => (<TimeLineDot key={dot.yearMonth} {...dot} active={currentStep >= dot.step}/>))}
          </div>
        </div>
      </div>
      {currentStep === 9 && <img
        src={DevBcn2025.deloreanTransparent}
        style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '70%', objectFit: 'contain'
        }}
      />}
    </DevBcn2025.SlideTemplate>
  );
};

export default slideControls(Slide140,
  `/presentations/${DevBcn2025.SLUG}/slide-130-mcp-standard`,
  `/presentations/${DevBcn2025.SLUG}/slide-150-mcp-servers`,
  9);
