import React from "react";
import "./ClaimCredit.css";
import "../centrePage.css";

const ClaimCredit = (props) => {
  return (
    <>
      <div className="left-section">
        <p>
          Earn <strong>Carbon Credit Tokens </strong>
          to offset your footprint or trade them in the marketplace
        </p>
        <button className="earn-credit" onClick={() => props.popup(true)}>
          Earn Credit
        </button>
      </div>
      <div className="mid-section">
        <p>
          Total <strong>Carbon Credit</strong> due for April, 2025:
        </p>
        <h5 className="primary">
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
          {props.credits} CCT
        </h5>
        <div className="pay-section">
          <input
            type="text"
            placeholder="Enter token amount"
            value={props.tokenAmount}
            onChange={props.handleTokenChange}
            className="token-input"
          />
          <select
            value={props.unit}
            onChange={props.handleUnitChange}
            className="unit-select"
          >
            <option value="CCT">CCT</option>
            <option value="KWH">KWH</option>
          </select>
          <button className="pay-credit" onClick={props.payCarbonCredit}>
            Pay Carbon Credit
          </button>
        </div>
      </div>
      <div className="right-section">
        <div className="error-div">
          <p>Last credit payment</p>
          <h6 className="error">
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
            {props.lastPayment} CCT
          </h6>
        </div>
        <div className="success-div">
          <p>Available credits</p>
          <h6 className="success">
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
            {props.availableCredits} CCT
          </h6>
        </div>
      </div>
    </>
  );
};

export default ClaimCredit;
