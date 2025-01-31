import React, { useState } from "react";
import Sidebar from "./SideBar.jsx";
import RightSidebar from "./RightSideBar.jsx";
import CentrePage from "./centrePage.jsx";
import TransactionsTable from "./transactiontable.jsx";
import EarnCreditsPopup from "./ClaimCredit/EarnCredit/EarnCreditsPopup.jsx";
import ValidatingPopup from "./ClaimCredit/EarnCredit/ValidatingPopup.jsx";
import ConfirmPopUp from "./ClaimCredit/EarnCredit/ConfirmPopup.jsx";
import RegisterDevicePopUp from "./RegisterDevicePopUp.jsx";
import axios from "axios";
import contractArtifact from "../../blockchain_files/CCToken.json";
import { ethers } from "ethers";

import "./Sidebar.css";
import "./RightSidebar.css";
import "./DashBoardPage.css";

const Dashboard = (e) => {
  const [showEarnCreditPopup, setShowEarnCreditPopup] = useState(0);
  const [availableCredits, setAvailableCredits] = useState(0);
  const [deviceRegistered, setDeviceRegistered] = useState(false);
    const contractABI = contractArtifact.abi;
    const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
  const popup = (x) => {
    setShowEarnCreditPopup(x);
  };

  const handleEarnCredit = async(energyProduced) => {
    setShowEarnCreditPopup(2);

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

    const provider = new ethers.BrowserProvider(window.ethereum); // For ethers v6
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    
    
    const tx = await contract.earnCarbonCredit(
      energyProduced,
      timestamp
    );
    console.log(`earn credit Transaction sent: ${tx.hash}`);
    await tx.wait();
    console.log(`earn credit Transaction confirmed`);
    setShowEarnCreditPopup(3);
    let userCredits=await contract.balanceOf(userWalletAddress);
    setAvailableCredits(userCredits);
    console.log(userCredits);


  };
  async function connectedToMetamask(account){
    const provider = new ethers.BrowserProvider(window.ethereum); // For ethers v6
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    const userCredits=await contract.balanceOf(account);
    setAvailableCredits(userCredits);
  }
  function deviceRegister(x){
    setDeviceRegistered(x);
  }
  return (
    <>
    {(showEarnCreditPopup!=0) && (
      <>
        <div className="popup-overlay" onClick={() => popup(false)}></div>
        <div className="earnCreditPopup">
          {showEarnCreditPopup === 1 ? (
            <EarnCreditsPopup popup={popup} handleEarnCredit={handleEarnCredit} />
          ) : showEarnCreditPopup === 2 ? (
            <ValidatingPopup popup={popup} />
          ) : showEarnCreditPopup === 3 ? (
            <ConfirmPopUp popup={popup} CCTRecievedFromEnergy={CCTRecievedFromEnergy} />
          ) : (
            <RegisterDevicePopUp popup={popup} deviceRegistered={deviceRegister} />
          )}
        </div>
      </>
    )}
      <div className="dashboard-conatainer">
        <Sidebar userData={e.userData[0]} />
        <div className="centre-dashboard-div">
          <CentrePage userData={e.userData[0]} popup={popup} userCCT={availableCredits} deviceRegistered={deviceRegistered} />
          <TransactionsTable userData={e.userData} />
        </div>
        <RightSidebar userData={e.userData[0]} connectedToMetamask={connectedToMetamask} />
      </div>
    </>
  );
};

export default Dashboard;
