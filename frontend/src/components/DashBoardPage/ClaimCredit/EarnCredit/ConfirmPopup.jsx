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
          <button className="confirm-button"onClick={()=>props.popup(0)}>Claim Credit</button>
        </div>
        
      </>
  );
};

export default ConfirmPopUp;
