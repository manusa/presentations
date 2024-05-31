import React from 'react';
import {Helmet} from 'react-helmet';
import {DevBcn2024} from '../../../components';
import slideControls from '../../../components/slide-controls/slide-controls';

import '../../../components/2023-eclipsecon-helm-for-java-developers/styles/index.scss';


const Index = () => (
  <div className={DevBcn2024.CLASS_NAME}>
    <Helmet>
      <title>{DevBcn2024.TITLE}</title>
    </Helmet>
    <DevBcn2024.Cover />
  </div>
);

export default slideControls(Index, '/', `/presentations/${DevBcn2024.SLUG}/slide-010`);
