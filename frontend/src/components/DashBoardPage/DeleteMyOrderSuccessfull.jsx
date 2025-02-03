import React from "react";
import "./ClaimCredit/EarnCredit/ConfirmPopup.css";
import "./SellCredit/popups/SellConfirmPopUp.css";
import ethsvg from "./SellCredit/popups/eth.svg";

const DeleteMyOrderSuccessfull = (props) => {
  return (
    <>
      <button className="popup-close" onClick={() => props.popupDelete(false)}>
        &times;
      </button>
      <div className="popup-title-parent">
        <h2 className="popup-title">Successful</h2>
        <p className="popup-subtitle">
          Your order has been Cancelled successfully 
        </p>
      </div>
     
      <div class="success-container">
        <div class="success-circle">
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              class="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path class="checkmark-check" fill="none" d="M14 27l7 7 16-16" />
          </svg>
        </div>
      </div>
      <div className="input-container">
        <button className="confirm-button" onClick={() => props.popupDelete(0)}>
          OK
        </button>
      </div>
    </>
  );
};

export default DeleteMyOrderSuccessfull;
