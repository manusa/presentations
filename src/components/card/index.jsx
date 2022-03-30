import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';

export const Card = ({children, onClick}) => (
  <div onClick={onClick} className={'card'}>
    {children}
  </div>
);

Card.propTypes = {
  onClick: PropTypes.func
};

Card.defaultProps = {
  onClick: null
};
