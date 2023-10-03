import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {EclipseCon2023} from '../../../components';

const GoalRow = ({goal, innerLoop = '', outerLoop = ''}) =>
  <tr>
    <td className='left'>{goal}</td>
    <td>{innerLoop}</td>
    <td>{outerLoop}</td>
  </tr>;

const Slide130 = () => {
  return (
    <EclipseCon2023.SlideTemplate slide={13} title='What is Eclipse JKube? (III)'>
      <h2>Features</h2>
      <table style={{width: '80%'}}>
        <thead>
        <tr>
          <th />
          <th>Inner Loop</th>
          <th>Outer Loop</th>
        </tr>
        </thead>
        <tbody>
        <GoalRow goal='build' innerLoop='✅' outerLoop='✅'/>
        <GoalRow goal='push' innerLoop='✔️' outerLoop='✅'/>
        <GoalRow goal='resource' innerLoop='✅' outerLoop='✅️'/>
        <GoalRow goal='apply' innerLoop='✅' outerLoop='✅️'/>
        <GoalRow goal='helm' innerLoop='❌' outerLoop='✅'/>
        <GoalRow goal='helm-push' innerLoop='❌️' outerLoop='✅'/>
        <GoalRow goal='undeploy' innerLoop='✅' outerLoop='✔️'/>
        <GoalRow goal='log' innerLoop='✅' outerLoop='✔️'/>
        <GoalRow goal='watch' innerLoop='✅' outerLoop='❌️'/>
        <GoalRow goal='remote-dev' innerLoop='✅' outerLoop='❌'/>
        </tbody>
      </table>
    </EclipseCon2023.SlideTemplate>
  );
};

export default slideControls(Slide130,
  `/presentations/${EclipseCon2023.SLUG}/slide-120`,
  `/presentations/${EclipseCon2023.SLUG}/slide-140`);
