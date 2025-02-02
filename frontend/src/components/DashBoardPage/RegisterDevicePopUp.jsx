import React, { useState } from "react";
import "./ClaimCredit/EarnCredit/EarnCreditsPopup.css";
import axios from "axios";
const RegisterDevicePopUp = (props) => {
  const [address, setAddress] = useState("");

  async function handleRegisterDevice() {
    await axios
      .post("http://localhost:8080/registerDevice", {
        deviceAddress: address,
      })
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data.success) {
          props.deviceRegistered(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <button className="popup-close" onClick={() => props.popup(false)}>
        &times;
      </button>
      <div className="popup-title-parent">
        <h2 className="popup-title">Register Device</h2>
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
            className="input-field-earn"
             defaultValue=""
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className="confirm-button" onClick={handleRegisterDevice}>
          Confirm
        </button>
      </div>
    </>
  );
};

export default RegisterDevicePopUp;
