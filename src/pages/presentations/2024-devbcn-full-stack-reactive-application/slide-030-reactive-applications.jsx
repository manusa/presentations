import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import {DevBcn2024} from '../../../components';

const ItemList = ({style, children, ...props}) => (
  <div style={{
    margin: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', alignContent: 'center', gap: '1rem', ...style
  }} {...props}>
    {children}
  </div>
);

const Item = ({children}) => (
  <div style={{margin: 0, padding: '0.5rem', background: DevBcn2024.BLUE, color: 'white', borderRadius: '1rem', fontSize: '2rem'}}>
    {children}
  </div>
);

const ReactiveSystemsInJava = ({style, ...props}) => {
  return (
    <div
      style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        height: '90%',
        ...style
      }} {...props}
    >
      <img
        style={{maxHeight: '100%', maxWidth: '100%', boxShadow: '0 0 2rem 0rem #A7A7A7D6'}}
        src={DevBcn2024.reactiveSystemsInJava}
        alt='Reactive Systems in Java book cover'
      />
    </div>
  );
}

const Slide030 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <DevBcn2024.SlideTemplate slide={3} title='What is a Reactive Application?'>
        <DevBcn2024.ReactiveSystemsDiagram/>
      <div style={{position: 'absolute', top: 0, bottom: 0, right: 0, width: '30rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <ItemList className={`${classNameVisibleFrom(2)}`} style={{height: 'calc(33% - 1rem)'}}>
          <Item>Usability</Item>
          <Item>Rapid response times</Item>
          <Item>Problems detected quickly</Item>
        </ItemList>
        <ItemList className={`${classNameVisibleFrom(3)}`} style={{height: '33%'}}>
          <Item>Resiliency</Item>
          <Item>High availability</Item>
          <Item>Self-healing</Item>
          <Item>Isolation</Item>
          <Item>Varying Workloads</Item>
          <Item>Replication</Item>
        </ItemList>
        <ItemList className={`${classNameVisibleFrom(4)}`} style={{height: 'calc(33% - 1rem)'}}>
          <Item>Asynchronous</Item>
          <Item>Boundaries</Item>
          <Item>Loose coupling</Item>
          <Item>Non-blocking</Item>
          <Item>Backpressure</Item>
        </ItemList>
      </div>
      <ReactiveSystemsInJava  className={`${classNameVisibleFrom(5)}`} />
      <div style={{position: 'fixed', left: '1rem', bottom: '1rem', fontSize: '1rem', fontStyle: 'italic'}}>
        The Reactive Manifesto (https://www.reactivemanifesto.org/)
      </div>
    </DevBcn2024.SlideTemplate>
  );
};

export default slideControls(Slide030,
  `/presentations/${DevBcn2024.SLUG}/slide-020-agenda`,
  `/presentations/${DevBcn2024.SLUG}/slide-040-kubernetes-what-is`,
  5);
