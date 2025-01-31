import React, { useState } from "react";
import "./ClaimCredit/EarnCredit/EarnCreditsPopup.css";
import axios from "axios";
const RegisterDevicePopUp = (props) => {

  
  const [address, setAddress] = useState("");

 async function handleRegisterDevice() {
    await axios.post('http://localhost:8080/registerDevice', {
        deviceAddress: address
      })
      .then(response => {
        console.log('Response:', response.data);
        if(response.data.success){
            props.deviceRegistered(true);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  return (
    <div className="popup-container earnCreditPopup">
      <button className="popup-close" onClick={() => props.popup(false)}>
        &times;
      </button>
      <h2 className="popup-title">Register Device</h2>
      <p className="popup-subtitle">
        Earn Carbon credit token through your carbon offset
      </p>
      <div className="credit-details">
        <h3 className="credit-type">New Renewal Energy Credit</h3>
        <p className="credit-timestamp">27-05-2024 13:11:57</p>
      </div>
      <div className="input-container">
        <label htmlFor="power-output" className="input-label">
          Please provide your device address
        </label>
        <div className="input-group">
          <input
            type="text"
            id="power-output"
            placeholder="Power output"
            className="input-field"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <button className="confirm-button" onClick={handleRegisterDevice}>Confirm</button>
    </div>
  );
};

export default RegisterDevicePopUp;
