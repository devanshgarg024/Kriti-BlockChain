import React, { useState } from "react";
import "./EarnCreditsPopup.css";

const EarnCreditsPopup = (props) => {

  
  const [powerOutput, setPowerOutput] = useState(0);
  const [unit, setUnit] = useState("kWh");

 async function handleEarnCredit() {
    let energyProduced=0;
    if(unit==="kWh"){
      energyProduced=powerOutput;
    }
    else{
      energyProduced=powerOutput*1000;
    }
    props.handleEarnCredit(energyProduced);

  }

  return (
    // <div className="popup-container earnCreditPopup">
    <>
      <button className="popup-close" onClick={() => props.popup(false)}>
        &times;
      </button>
     <div className="popup-title-parent">
     <h2 className="popup-title">Earn Credits</h2>
      <p className="popup-subtitle">
        Earn Carbon credit token through your carbon offset
      </p>
     </div>
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
            type="number"
            id="power-output"
            placeholder="Power output"
            className="input-field-earn"
            value={powerOutput}
            onChange={(e) => setPowerOutput(e.target.value)}
          />
          <select
            className="input-select"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="kWh">kWh</option>
            <option value="MW">MW</option>
          </select>
        </div>
        <button className="confirm-button" onClick={handleEarnCredit}>Confirm</button>
      </div>
      
    </>
  );
};

export default EarnCreditsPopup;
