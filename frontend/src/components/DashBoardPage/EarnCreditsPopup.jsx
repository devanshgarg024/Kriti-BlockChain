import React from "react";

const EarnCreditsPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="popup-title">Earn Credits</h2>
        <p className="popup-subtitle">
          Earn Carbon credit token through your carbon offset
        </p>
        <div className="credit-details">
          <h3 className="credit-type">New Renewal Energy Credit</h3>
          <p className="credit-timestamp">27-05-2024 13:11:57</p>
        </div>
        <div className="input-container">
          <label htmlFor="power-output" className="input-label">
            Please provide your current power output
          </label>
          <div className="input-group">
            <input
              type="text"
              id="power-output"
              placeholder="Power output"
              className="input-field"
            />
            <select className="input-select">
              <option value="kWh">kWh</option>
              <option value="MW">MW</option>
            </select>
          </div>
        </div>
        <button className="confirm-button">Confirm</button>
      </div>
    </div>
  );
};

export default EarnCreditsPopup;
