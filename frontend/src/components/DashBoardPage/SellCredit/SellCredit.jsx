import React, { useState } from "react";
import "./SellCredit.css";
import "../centrePage.css";

const SellCredit = (props) => {
  const [creditAmount, setCreditAmount] = useState("90000");
  const [ethAmount, setEthAmount] = useState("9000");
  const [fromUnit, setFromUnit] = useState("CCT");
  const [toUnit, setToUnit] = useState("ETH");

  // Handles input validation (only numbers allowed)
  const handleCreditChange = (e) => {
    const value = e.target.value.replace(/\D/, ""); // Remove non-numeric chars
    setCreditAmount(value);
  };

  const handleEthChange = (e) => {
    const value = e.target.value.replace(/\D/, ""); // Remove non-numeric chars
    setEthAmount(value);
  };

  // Handles swapping values and units
  const handleSwap = () => {
    setCreditAmount(ethAmount);
    setEthAmount(creditAmount);
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  // Handles unit selection changes
  const handleFromUnitChange = (e) => {
    setFromUnit(e.target.value);
  };

  const handleToUnitChange = (e) => {
    setToUnit(e.target.value);
  };

  return (
    <>
      {/* Right Section */}
      <div className="right-section">
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
        <div className="error-div">
          <p>No sell orders yet</p>
        </div>
      </div>

      {/* Mid Section */}
      <div className="mid-section mid-section-sell">
        <p>Current Exchange Rate</p>
        <div className="pay-section pay-section-sell">
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
          1CCT ={" "}
          <select
            value={props.unit}
            onChange={props.handleUnitChange}
            className="unit-select unit-select-sell"
          >
            <option value="0.1 ETH">0.1 ETH</option>
            <option value="KWH">KWH</option>
          </select>
          <button className="pay-credit pay-credit-sell" onClick={props.payCarbonCredit}>
            Change
          </button>
        </div>
      </div>

      {/* Left Section */}
      <div className="left-section left-section-sell">
        <h3>Sell available credits</h3>

        <div className="input-group">
          <input
            type="text"
            value={creditAmount}
            onChange={handleCreditChange}
            placeholder="Enter amount"
            className="token-input"
          />
            <select value={fromUnit} onChange={handleFromUnitChange} className="unit-select">
              <option value="CCT">CCT</option>
              <option value="ETH">ETH</option>
            </select>
        </div>

        <div className="swap-icon" onClick={handleSwap}>
          ↑↓
        </div>

        <div className="input-group">
          <input
            type="text"
            value={ethAmount}
            onChange={handleEthChange}
            placeholder="Enter amount"
            className="token-input"
          />
            <select value={toUnit} onChange={handleToUnitChange} className="unit-select">
              <option value="ETH">ETH</option>
              <option value="CCT">CCT</option>
            </select>
        </div>

        <button className="sell-button">Sell</button>
      </div>
    </>
  );
};

export default SellCredit;
