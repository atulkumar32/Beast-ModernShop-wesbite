'use client';

import './LoadingSpinner.scss';

const LoadingSpinner = ({ size = 'medium', color = 'primary', text = '' }) => {
  return (
    <div className={`loading-spinner loading-spinner--${size}`}>
      <div className={`spinner spinner--${color}`}></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;