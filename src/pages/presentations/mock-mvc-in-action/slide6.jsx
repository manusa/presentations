import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import './slide6.scss';

const Slide4 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <div className={'slide slide6'}>
      <div className={'title'}>Advantages of MockMVC - What can you test</div>
      <ul className={'content'}>
        <li className={classNameVisibleFrom(2)}>
          Contract compliance
        </li>
        <li className={classNameVisibleFrom(3)}>
          Content negotiation headers
        </li>
        <li className={classNameVisibleFrom(4)}>
          Response codes
        </li>
        <li className={classNameVisibleFrom(5)}>
          JSON serialization/deserialization
        </li>
        <li className={classNameVisibleFrom(6)}>
          Availability of request/response headers
        </li>
        <li className={classNameVisibleFrom(7)}>
          Validation
        </li>
        <li className={classNameVisibleFrom(8)}>
          Exception handling
        </li>
        <li className={classNameVisibleFrom(9)}>
          Corner cases and configurations
        </li>
      </ul>
    </div>
  );
};

export default slideControls(Slide4, '/presentations/mock-mvc-in-action/slide5', '/presentations/mock-mvc-in-action/slide7', 9);
