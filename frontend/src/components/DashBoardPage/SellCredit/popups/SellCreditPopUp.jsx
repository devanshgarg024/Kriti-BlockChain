import React, { useState } from "react";
import "./SellCreditPopUp.css";
import "../../ClaimCredit/EarnCredit/EarnCreditsPopup.css";

const SellCreditPopUp = (props) => {

  
  const [amountToSell, setAmountToSell] = useState(null);
  const [unit, setUnit] = useState("CCT");

 async function handleSellCredit() {
  let sellingAmount;
  if (!isNaN(amountToSell) && amountToSell.trim() !== '') {
    // Convert the string to a number
    const num = parseFloat(amountToSell);

    // Find the number of decimal places
    const decimalPlaces = (amountToSell.split('.')[1] || '').length;

    // Convert to integer by truncating based on decimal places
    sellingAmount=Math.floor(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
} else {
    alert("add a valid amount");
}
    props.handleSellCredit(sellingAmount);
    props.popup(6);

  }

  return (
    <>
      <button className="popup-close" onClick={() => props.popup(false)}>
        &times;
      </button>
      <h2 className="popup-title">Sell Credits</h2>
      <p className="popup-subtitle">
        Sell Carbon credit tokens in our marketplace.
      </p>
      <div className="credit-details">
        <h2>Available Credits</h2>
        <h2>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-lightning-fill"
            viewBox="0 0 16 16"
          >
            <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
          </svg>{" "} 0 CCT
        </h2>
      </div>
      <div className="input-container">
        <label htmlFor="power-output" className="input-label">
          How much you want to sell?
        </label>
        <div className="input-group">
          <input
            type="text"
            id="power-output"
            placeholder="Enter the amount"
            className="input-field"
            value={amountToSell}
            onChange={(e) => setAmountToSell(e.target.value)}
          />
          <select
            className="input-select"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="CCT">CCT</option>
          </select>
        </div>
      </div>
      <button className="confirm-button" onClick={handleSellCredit}>Sell</button>
    </>
  );
};

export default SellCreditPopUp;
