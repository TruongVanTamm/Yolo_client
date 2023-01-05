import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const bg = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main';
  const size = props.size ? 'btn-' + props.size : '';
  const animate = props.animate ? 'btn-animate' : '';
  const BtnHide = props.BtnHide ? 'BtnHide' : '';
  const noMargin=props.noMargin ? 'noMargin' : '';
  return (
    <button
      className={` btn ${bg} ${size} ${animate} ${BtnHide}  ${noMargin}`}
      onClick={props.onClick ? props.onClick : null}
    >
      <span className="btn__text">{props.children}</span>
      {props.icon ? (
        <span className="btn__icon">
          <i className={`${props.icon} bx-tada`}></i>
        </span>
      ) : null}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.string,
  icon: PropTypes.string,
  animate: PropTypes.bool,
  onCick: PropTypes.func,
};

export default Button;
