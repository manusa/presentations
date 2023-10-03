import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {EclipseCon2023} from '../../../components';

const Slide030 = () => {
  return (
    <EclipseCon2023.SlideTemplate slide={3} title='Inner Loop vs. Outer Loop'>
      <div style={{height: '100%', display: 'flex', gap: '3rem', alignItems: 'center'}}>
        <ul>
          <li>
            Inner Loop
            <ul>
              <li>Developer's cycle before application is shared</li>
              <li>Feedback loop <strong>must</strong> be fast</li>
            </ul>
          </li>
          <li>
            Outer Loop
            <ul>
              <li>After commit-push</li>
              <li>CI/CD - <strong>must</strong> be automated</li>
            </ul>
          </li>
          <li>
            Cloud/K8s very challenging
          </li>
        </ul>
        <EclipseCon2023.InnerOuterLoop style={{height: '100%'}} />
      </div>
    </EclipseCon2023.SlideTemplate>
  );
};

export default slideControls(Slide030,
  `/presentations/${EclipseCon2023.SLUG}/slide-020`,
  `/presentations/${EclipseCon2023.SLUG}/slide-040`);
