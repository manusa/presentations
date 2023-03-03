import React from 'react';
import {TitleSlideTemplate} from '../../../../components';
import {CLASS_NAME} from '../';
import logo from '../assets/duke-kubernetes-surf-sc.png';
import '../styles/title-template.scss';

export const TitleTemplate = ({className = '', ...props}) =>
  <TitleSlideTemplate
    classNamePrefix={CLASS_NAME}
    logoContent={<img src={logo} alt='An image of the Duke riding a Kubernetes surfboard' />}
    {...props}
  />;

export default TitleTemplate;
