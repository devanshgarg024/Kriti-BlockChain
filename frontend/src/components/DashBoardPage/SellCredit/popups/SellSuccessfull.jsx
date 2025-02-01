import React from "react";
import "././../../ClaimCredit/EarnCredit/ConfirmPopup.css";
import "./SellConfirmPopUp.css";
import ethsvg from "../popups/eth.svg";

const SellSuccessfull = (props) => {
  return (
    <>
      <button className="popup-close" onClick={() => props.popup(false)}>
        &times;
      </button>
      <div className="popup-title-parent">
        <h2 className="popup-title">Successful</h2>
        <p className="popup-subtitle">
          Youre order has been successful
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
      <div className="ConfirmCredit-details">
        <h3>Sell Order</h3>
        <h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-lightning-fill"
            viewBox="0 0 16 16"
          >
            <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
          </svg>{" "}
          900000 CCT ={" "}
          <img src={ethsvg} width="16" height="16" /> {" "}6750 ETH
        </h3>
      </div>
      <div className="input-container">
        <button className="confirm-button" onClick={() => props.popup(0)}>
          OK
        </button>
      </div>
    </>
  );
};

export default SellSuccessfull;
