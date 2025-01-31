import React from "react";
import "./EarnCreditsPopup.css";
import "./ConfirmPopup.css";

const ConfirmPopUp = (props) => {
  return (
      <>
        <button className="popup-close" onClick={()=>props.popup(false)}>
          &times;
        </button>
        <div className="popup-title-parent">
        <h1 className="popup-title">Confirmed</h1>
        <p className="popup-subtitle">
          The available Carbon Credit Token shown below
        </p>
        </div>
        <div class="success-container">
        <div class="success-circle">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark-check" fill="none" d="M14 27l7 7 16-16"/>
            </svg>
        </div>
    </div>
        <div className="input-container">
          <div className="input-group">
            <input
              type="text"
              id="power-output"
              placeholder="Number of the tokens..."
              className="input-field"
            />
            <select className="input-select">
              <option value="kWh">CCT</option>
              <option value="MW">KWH</option>
            </select>
          </div>
          <button className="confirm-button">Claim Credit</button>
        </div>
        
      </>
  );
};

export default ConfirmPopUp;
