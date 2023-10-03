import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {EclipseCon2023} from '../../../components';
import bluto from '../../../components/2023-eclipsecon-helm-for-java-developers/assets/bluto.png';

const Slide080 = () => {
  return (
    <EclipseCon2023.TitleTemplate titleBandVisible={false} logoContent={<></>}>
      <img src={bluto} alt='A picture of Bluto' style={{position: 'absolute', margin: '0 auto', top: '15vh', height: '70vh'}} />
    </EclipseCon2023.TitleTemplate>
  );
}

export default slideControls(Slide080,
  `/presentations/${EclipseCon2023.SLUG}/slide-070`,
  `/presentations/${EclipseCon2023.SLUG}/slide-090`);
