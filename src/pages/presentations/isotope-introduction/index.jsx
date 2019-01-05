import React from 'react';
import {Helmet} from 'react-helmet';
import slideControls from '../../../components/slide-controls/slide-controls';
import './index.scss';

const TITLE = 'Isotope Mail Introduction';

const IsotopeIntroduction = () => (
  <div className={'isotope-introduction'}>
    <Helmet>
      <title>{TITLE}</title>
    </Helmet>
    <div>
      <h1 className={'title'}>{TITLE}</h1>
      <h2 className={'subtitle'}>Marc Nuri</h2>
    </div>
  </div>
);

export default slideControls(IsotopeIntroduction, '/', '/presentations/isotope-introduction/slide1');
