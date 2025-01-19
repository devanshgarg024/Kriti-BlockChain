import React from "react";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo-container">
      <a href="/">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJKLnf3uciOQDBdlA_GH6JkeedIHhw6hVkLw&s"
          alt="Company Logo"
          className="logo-image"
        />
        <span className="logo-text">AMPLY</span>
      </a>
    </div>
  );
};

export default Logo;
