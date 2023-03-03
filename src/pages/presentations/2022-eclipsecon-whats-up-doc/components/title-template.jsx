import React from 'react';
import {TitleSlideTemplate} from "../../../../components";
import {CLASS_NAME} from '../';
import logo from '../assets/eclipsecon2022-white.png';
import '../styles/title-template.scss';

export const TitleTemplate = ({...props}) =>
  <TitleSlideTemplate
    classNamePrefix={CLASS_NAME}
    logoContent={<img src={logo} alt='An image of the EclipseCon logo' />}
    {...props}
  />;

export default () => {};
