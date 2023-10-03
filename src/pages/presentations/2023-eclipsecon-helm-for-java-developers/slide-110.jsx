import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {EclipseCon2023} from '../../../components';
import popeyeSpinach from '../../../components/2023-eclipsecon-helm-for-java-developers/assets/popeye-spinach.png';

const Slide110 = () => {
  return (
    <EclipseCon2023.TitleTemplate titleBandVisible={false} logoContent={<></>}>
      <style>{`
        @keyframes scale-animation {
          0% { transform: scale(0.93); }
          50% { transform: scale(1); }
          100% { transform: scale(0.93); }
        }
      `}</style>
      <img
        src={popeyeSpinach}
        style={{position: 'absolute', margin: '0 auto', top: '15vh', height: '75vh', animation: 'scale-animation 4s linear infinite'}}
        alt='A picture of Popeye squeezing a can of Spinach'
      />
    </EclipseCon2023.TitleTemplate>
  );
}

export default slideControls(Slide110,
  `/presentations/${EclipseCon2023.SLUG}/slide-100`,
  `/presentations/${EclipseCon2023.SLUG}/slide-120`);
