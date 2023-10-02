import React from 'react';
import {Helmet} from 'react-helmet';
import {EclipseCon2023} from '../../../components';
import slideControls from '../../../components/slide-controls/slide-controls';

import '../../../components/2023-eclipsecon-helm-for-java-developers/styles/index.scss';


const Index = () => (
  <div className={EclipseCon2023.CLASS_NAME}>
    <Helmet>
      <title>{EclipseCon2023.TITLE}</title>
    </Helmet>
    <EclipseCon2023.Cover />
  </div>
);

export default slideControls(Index, '/', `/presentations/${EclipseCon2023.SLUG}/slide-010`);
