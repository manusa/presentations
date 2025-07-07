import React from 'react';
import {BLUE} from './';

export const Header = ({style = {}, children}) => (
  <th style={{backgroundColor: BLUE, color: 'white', padding: '0.5rem 1rem', textAlign: 'center', fontSize: '2rem', ...style}}>
    {children}
  </th>
);
export const Cell = ({style = {}, children}) => (
  <td style={{backgroundColor: BLUE + '30', verticalAlign: 'top', padding: '1rem', fontSize: '2rem', ...style}}>
    {children}
  </td>
);
