import React from "react";
import "./loader.css";

const Loader = ({ isSmall }) => {
  if (isSmall) {
    return (
      <div className="clip-loader">
        <div className="small-loader-container">
          <div className="logo-container">
            <div className="small-loader" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="logo-container">
        <div className="loader" />
      </div>
    </div>
  );
};

export default Loader;
