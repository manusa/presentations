import React from 'react';
import {PopeyePunch} from './popeye-punch';
import {PopeyeTheSailor} from './popeye-the-sailor';
import {CLASS_NAME} from './';

import './styles/popeye-the-sailor-cover.scss';

export const Cover = () => {
  return (
    <div className={`${CLASS_NAME}-cover`}>
      <div className={`${CLASS_NAME}-cover__producer`}>Eclipse Pictures</div>
      <div className={`${CLASS_NAME}-cover__popeye-the-sailor`}>
        <PopeyePunch className={`${CLASS_NAME}-cover__popeye-the-sailor-illustration`} />
        <PopeyeTheSailor className={`${CLASS_NAME}-cover__popeye-the-sailor-text`} />
      </div>
      <div className={`${CLASS_NAME}-cover__title`}>
        Helm for Java developers with Eclipse JKube
      </div>
    </div>
  );
};
