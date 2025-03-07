import React from "react";
import "./LoadingSpinner.css";

export const LoadingSpinner = () => {
  return (
    <div className={`spinner-container `}>
      <div className={`spinner-border`} role="status">
        <span className={`visually-hidden `}>Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
