import React, { useState } from "react";

const PasswordInput = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    
      <div className="input-field">
        <input
          type={passwordVisible ? "text" : "password"}
          id="password"
          className="password"
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="toggle-password"
        >
          {passwordVisible ? "Hide" : "Show"}
        </button>
      </div>

  );
};

export default PasswordInput;
