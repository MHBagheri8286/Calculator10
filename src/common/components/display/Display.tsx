import React from 'react';
import './Display.scss';

interface DisplayProps {
  history: string;
  result: string;
}

const Display: React.FC<DisplayProps> = ({ history, result }) => {
  return (
    <div className="display">
      <div className="display-history">{history}</div>
      <div className="display-result">{result}</div>
    </div>
  );
};

export default Display;