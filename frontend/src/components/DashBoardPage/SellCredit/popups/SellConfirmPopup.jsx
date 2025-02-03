import React from "react";
import "././../../ClaimCredit/EarnCredit/ConfirmPopup.css";
import "./SellConfirmPopUp.css";
import ethsvg from "../popups/eth.svg";

const SellConfirmPopUp = (props) => {
  return (
    <>
      <button className="popup-close" onClick={() => props.popup(false)}>
        &times;
      </button>
      <div className="popup-title-parent">
        <h2 className="popup-title">Confirm</h2>
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
        <h3>Selling Carbon Credit Token with Rate</h3>
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
          1 CCT ={" "}
          <img src={ethsvg} width="16" height="16" /> {" "}{(() => {
                    const [base, exponent] = props.userppt
                      .toExponential(5)
                      .split("e");
                    return (
                      <>
                        {base} × 10<sup>{exponent}</sup>
                      </>
                    );
                  })()} ETH
        </h3>
      </div>
      <div className="input-container">
        <button className="confirm-button" onClick={() => props.popup(5)}>
          Confirm
        </button>
      </div>
    </>
  );
};

export default SellConfirmPopUp;
