import React from "react";
import "./Logo.css";
import logoImage from "../DashBoardPage/images/logo.png";
const Logo = () => {
  return (
    <div className="logo-container">
      <a href="/">
        <img
          src={logoImage}
          alt="Company Logo"
          className="logo-image"
        />
        <span className="logo-text">AMPLY</span>
      </a>
    </div>
  );
};

export default Logo;
