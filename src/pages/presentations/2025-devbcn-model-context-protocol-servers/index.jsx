import React from 'react';
import {Helmet} from 'react-helmet';
import {DevBcn2025} from '../../../components';
import slideControls from '../../../components/slide-controls/slide-controls';

import '../../../components/2024-devbcn-full-stack-reactive-application/styles/index.scss';

const Index = () => (
  <div className={`${DevBcn2025.CLASS_NAME}`}>
    <div className={`${DevBcn2025.CLASS_NAME}-index`}>
      <Helmet
        bodyAttributes={{'class': DevBcn2025.CLASS_NAME}}
      >
        <title>{DevBcn2025.TITLE}</title>
      </Helmet>
      <DevBcn2025.Cover />
    </div>
  </div>
);

export default slideControls(Index, '/', `/presentations/${DevBcn2025.SLUG}/slide-010-about`);
