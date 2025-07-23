import React from 'react';
import type { ButtonConfig } from '@models/calculator';
import './Button.scss';

interface ButtonProps {
  button: ButtonConfig;
  onClick: (button: ButtonConfig) => void;
}

const Button: React.FC<ButtonProps> = ({ button, onClick }) => {
  const { value, label, className } = button;

  return (
    <button
      className={`btn ${className || ''}`}
      onClick={() => onClick(button)}
      aria-label={typeof label === 'string' ? label : value}
    >
      {label}
    </button>
  );
};

export default Button;