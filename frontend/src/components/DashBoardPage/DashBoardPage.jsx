import React, { useState } from "react";
import Sidebar from "./SideBar.jsx";
import RightSidebar from "./RightSideBar.jsx";
import CentrePage from "./centrePage.jsx";
import TransactionsTable from "./transactiontable.jsx";
import EarnCreditsPopup from "./ClaimCredit/EarnCredit/EarnCreditsPopup.jsx";
import ValidatingPopup from "./ClaimCredit/EarnCredit/ValidatingPopup.jsx";
import ConfirmPopUp from "./ClaimCredit/EarnCredit/ConfirmPopup.jsx";
import RegisterDevicePopUp from "./RegisterDevicePopUp.jsx";
import SetTokenRate from "./SellCredit/popups/SetTokenRate.jsx";
import SellCreditPopUp from "./SellCredit/popups/SellCreditPopUp.jsx";
import axios from "axios";
import contractArtifact from "../../blockchain_files/CCToken.json";
import { ethers } from "ethers";

import "./Sidebar.css";
import "./RightSidebar.css";
import "./DashBoardPage.css";

const Dashboard = (e) => {
  const [showPopup, setShowPopup] = useState(0);
  const [account, setAccount] = useState(null);
  const [orderId, setOrderId] = useState(0);
  const [amountToSell, setAmountToSell] = useState(0);
  const [availableCredits, setAvailableCredits] = useState(0);
  const [deviceRegistered, setDeviceRegistered] = useState(false);
    const contractABI = contractArtifact.abi;
    const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
  const popup = (x) => {
    setShowPopup(x);
  };
  const handleSellCredit = async (pricePerToken) => {
    try {
      const am = ethers.parseUnits(amountToSell.toFixed(18), 18);

      const ac2 = BigInt(Math.round(Number(availableCredits) * 1e18));
      const am2 = BigInt(Math.round(Number(amountToSell) * 1e18));
      
      try {
        const response = await axios.post('http://localhost:8080/handleGenerateAndVerifyProof', {
          amountToSell: am2.toString(), 
          totalBalance: ac2.toString()
        });
  
        console.log('Response:', response.data);
        
        if (response.data.Output === '0') {
          alert("Insufficient Credits");
          return; // Exit function early
        }
      } catch (error) {
        console.error('Error in proof generation:', error);
        return; // Exit function early if an error occurs
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      // console.log("d");
      // Approve the marketplace contract to spend tokens on behalf of the user
      const approveTx = await contract.approve(CONTRACT_ADDRESS, am);
      console.log(`Approval transaction sent: ${approveTx.hash}`);
      await approveTx.wait();
      console.log("Approval confirmed");
  
      const ps = ethers.parseUnits(pricePerToken.toFixed(18), 18);

  
      // Call placeSellOrder
      const sellTx = await contract.placeSellOrder(am, ps);
      console.log(`Sell order transaction sent: ${sellTx.hash}`);
  
      // Wait for transaction confirmation
      const receipt = await sellTx.wait();
      console.log("Sell order placed successfully");
  
      // Extract orderId from event logs
      const event = receipt.logs.find(log => log.fragment.name === "SellOrderPlaced");
  
      let orderId = null;
      if (event) {
          orderId = Number(event.args[0]); // Extract orderId from event arguments
          console.log(`Order placed successfully with ID: ${orderId}`);
      } else {
          console.log("SellOrderPlaced event not found in transaction logs");
          return; // Exit function if order ID is not found
      }
  
      const timestamp = Date.now();
  
      try {
        const orderResponse = await axios.post('http://localhost:8080/sellOrder', {
          orderId: orderId, 
          seller: account, 
          amountToSell: amountToSell,
          pricePerToken: pricePerToken,
          timestamp: timestamp,
        });
  
        console.log('Order Response:', orderResponse.data);
      } catch (error) {
        console.error('Error in placing sell order:', error);
        return; // Exit function early if an error occurs
      }
  
      popup(3);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
  const handleEarnCredit = async(energyProduced) => {
    setShowPopup(2);

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
    setShowPopup(3);
    let userCredits=await contract.balanceOf(userWalletAddress);
    setAvailableCredits(userCredits);
    console.log(userCredits);


  };
  async function connectedToMetamask(acnt){
    setAccount(acnt);
    const provider = new ethers.BrowserProvider(window.ethereum); // For ethers v6
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    const userCredits=await contract.balanceOf(acnt);
    setAvailableCredits(userCredits);
  }
  function deviceRegister(x){
    setDeviceRegistered(x);
  }
  function handleAmountToSell(x){
    setAmountToSell(x);
  }
  return (
    <>
    {(showPopup!=0) && (
      <>
        <div className="popup-overlay" onClick={() => popup(false)}></div>
        <div className="earnCreditPopup">
          {showPopup === 1 ? (
            <EarnCreditsPopup popup={popup} handleEarnCredit={handleEarnCredit} />
          ) : showPopup === 2 ? (
            <ValidatingPopup popup={popup} />
          ) : showPopup === 3 ? (
            <ConfirmPopUp popup={popup}  />
          ) : showPopup === 4 ?(
            <RegisterDevicePopUp popup={popup} deviceRegistered={deviceRegister} />
          ) : showPopup === 5 ?(
            <SellCreditPopUp popup={popup} handleSellCredit={handleAmountToSell} />
          ) : showPopup === 6 ?(
            <SetTokenRate popup={popup} handleSellCredit={handleSellCredit} />
          ) :(
            <ConfirmPopUp popup={popup}  />
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
