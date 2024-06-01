import React from 'react';
import {TurnRightArrow} from '../shapes';
import {ElasticIcon, EnvelopesIcon, LaptopRocketIcon, ResilienceIcon} from '../icons';
import {BLUE, ORANGE} from './styles';

const border = '2px dotted #999';
const iconStyle = {fill: ORANGE, height: '10rem'};

const Cell = ({children}) => (
  <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center', alignItems: 'center'}}>
    {children}
  </div>
);

const Row = ({style = {}, children}) => (
  <div style={{flex: 1, display: 'flex', justifyContent: 'center', ...style}}>
    {children}
  </div>
);

const RowTitle = ({children}) => (
  <div style={{
    width: '10rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: ORANGE
  }}>
    {children}
  </div>
);

const RowContent = ({style = {}, children}) => (
  <div style={{flex: 1, ...style}}>
    {children}
  </div>
);

export const ReactiveSystemsDiagram = ({...props}) => {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem'
    }} {...props}>
      <Row>
        <RowTitle>Value</RowTitle>
        <RowContent style={{display: 'flex', justifyContent: 'center', alignItems: 'end', gap: '5rem'}}>
          <Cell>
            <TurnRightArrow style={{fill: BLUE, height: '8rem'}}/>
          </Cell>
          <Cell>
            <LaptopRocketIcon style={iconStyle}/>
            Responsive
          </Cell>
          <Cell>
            <TurnRightArrow style={{fill: BLUE, height: '8rem', transform: 'scaleX(-1)'}}/>
          </Cell>
        </RowContent>
      </Row>
      <Row style={{borderTop: border, borderBottom: border, margin: '-1rem 0', padding: '1em 0'}}>
        <RowTitle>Form</RowTitle>
        <RowContent style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '27rem'}}>
          <Cell>
            <ResilienceIcon style={iconStyle}/>
            Resilient
          </Cell>
          <Cell>
            <ElasticIcon style={iconStyle}/>
            Elastic
          </Cell>
        </RowContent>
      </Row>
      <Row>
        <RowTitle>Means</RowTitle>
        <RowContent style={{display: 'flex', justifyContent: 'center', alignItems: 'start', gap: '3rem'}}>
          <Cell>
            <TurnRightArrow style={{fill: BLUE, height: '8rem', transform: 'rotate(270deg)'}}/>
          </Cell>
          <Cell>
            <EnvelopesIcon style={iconStyle}/>
            Message Driven
          </Cell>
          <Cell>
            <TurnRightArrow style={{fill: BLUE, height: '8rem', transform: 'rotate(270deg) scaleY(-1)'}}/>
          </Cell>
        </RowContent>
      </Row>
    </div>
  );
};
