<<<<<<< HEAD:frontend/src/components/DashBoardPage/ClaimCredit/EarnCredit/EarnCreditsPopup.jsx
import React from "react";
import "./EarnCreditsPopup.css";

=======
import React, { useState } from "react";
import "./EarnCreditsPopup.css";
import axios from "axios";
import contractArtifact from "../../../src/blockchain_files/CCToken.json";
import { ethers } from "ethers";
>>>>>>> a7806904d86f473667c9c01c35ee539aebd2a5a7:frontend/src/components/DashBoardPage/EarnCreditsPopup.jsx
const EarnCreditsPopup = (props) => {
const contractABI = contractArtifact.abi;
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
  
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
    let userWalletAddress=null;
    await fetch('http://localhost:8080/getWalletAddress')
    .then(response => response.json())  // Parse the JSON from the response
    .then(data => {
      userWalletAddress=data.walletAddress;
      // Use the data as needed
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    
    const timestamp = Date.now();

    await axios.post('http://localhost:8080/logSmartMeterData', {
      userWalletAddress: userWalletAddress, 
      energyProduced: energyProduced, 
      timestamp :timestamp
    })
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    console.log('Provider Processing ');
    const provider = new ethers.BrowserProvider(window.ethereum); // For ethers v6
    console.log('signer Processing ');
    const signer = await provider.getSigner();
    console.log('contract instance Processing ');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    const tx = await contract.earnCarbonCredit(
      energyProduced,
      timestamp
    );
    console.log(`earn credit Transaction sent: ${tx.hash}`);
    await tx.wait();
    console.log(`earn credit Transaction confirmed`);

        



  }

  return (
<<<<<<< HEAD:frontend/src/components/DashBoardPage/ClaimCredit/EarnCredit/EarnCreditsPopup.jsx
      <>
        <button className="popup-close" onClick={()=>props.popup(false)}>
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
              type="text"
              id="power-output"
              placeholder="Power output"
              className="input-field input-field-earn"
            />
            <select className="input-select">
              <option value="kWh">kWh</option>
              <option value="MW">MW</option>
            </select>
          </div>
          <button className="confirm-button">Confirm</button>
        </div>
        
      </>
=======
    <div className="popup-container earnCreditPopup">
      <button className="popup-close" onClick={() => props.popup(false)}>
        &times;
      </button>
      <h2 className="popup-title">Earn Credits</h2>
      <p className="popup-subtitle">
        Earn Carbon credit token through your carbon offset
      </p>
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
            className="input-field"
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
      </div>
      <button className="confirm-button" onClick={handleEarnCredit}>Confirm</button>
    </div>
>>>>>>> a7806904d86f473667c9c01c35ee539aebd2a5a7:frontend/src/components/DashBoardPage/EarnCreditsPopup.jsx
  );
};

export default EarnCreditsPopup;
