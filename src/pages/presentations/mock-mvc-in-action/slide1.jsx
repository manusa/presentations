import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
import './slide1.scss';

const Slide1 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <div className={'slide slide1'}>
      <div className={'title'}>MockMVC</div>
      <ul className={'content'}>
        <li className={classNameVisibleFrom(2)}>
          Main entry point for server-side Spring MVC test support
        </li>
        <li className={classNameVisibleFrom(3)}>
          Presentation
          <ul>
            <li>Test pyramid</li>
            <li>Aspect oriented / Code coverage</li>
            <li>Configuration types</li>
            <li>
              Examples
              <ul>
                <li>Spring Boot (1) - Spring MVC 4 - Web</li>
                <li>Spring Boot 2 - Spring MVC 5 - Webflux / Project reactor</li>
                <li>Bonus - WebTestClient</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default slideControls(Slide1, '/presentations/mock-mvc-in-action', '/presentations/mock-mvc-in-action/slide2', 3);
