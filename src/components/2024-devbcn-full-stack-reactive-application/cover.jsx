import React from 'react';
import {CLASS_NAME, TITLE} from './';

import './styles/cover.scss';

export const Cover = () => {
  return (
    <div className={`${CLASS_NAME}-cover`}>
      <div className={`${CLASS_NAME}-cover__subtitle`}>
        + DevBcn 2024 +
      </div>
      <div className={`${CLASS_NAME}-cover__title`}>
        {TITLE}
      </div>
      <div className={`${CLASS_NAME}-cover__author`}>
        Marc Nuri
      </div>
    </div>
  );
};
