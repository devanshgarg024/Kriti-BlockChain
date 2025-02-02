import React, { useState, useEffect } from "react";
import "./RightSideBar.css";
import NetMeteringCard from "./NetMeteringCard";
import CarbonCreditCard from "./CarbonCreditCard";
import axios from "axios";

const RightSidebar = (props) => {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // Track MetaMask connection

  useEffect(() => {
    setUser(props.userData);
  }, [props.userData]);

  const handleMetamaskLogin = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is not installed. Please install it to use this feature.");
      return;
    }

    try {
      // Request accounts from MetaMask
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const selectedAccount = accounts[0];  // Get the selected account
      setAccount(selectedAccount);
      // Update connection status
      props.connectedToMetamask(selectedAccount);

      // Request the account's balance
      const result = await window.ethereum.request({
        method: "eth_getBalance",
        params: [selectedAccount, "latest"],
      });

      const wei = parseInt(result, 16);
      const ethBalance = wei / 10 ** 18;
      setBalance(ethBalance.toFixed(4));

      // Send the wallet address to your backend
      axios.get(`http://localhost:8080/walletAddress?userWalletAddress=${selectedAccount}`)
        .then(response => {
          console.log('Response:', response.data);
          setIsConnected(true); 
        })
        .catch(error => {
          console.error('Error connecting wallet to backend:', error);
        });

    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  return (
    <div className="rightsidebar">
      <div className="welcome-section">
        <p>
          Hello <b>{user?.username || "User"}</b>
        </p>
        <div className="connect-btn">
          <button className={`metamask-button ${isConnected ? "connected" : ""}`} onClick={handleMetamaskLogin}>
            <img src="https://metamask.io/assets/icon.svg" alt="MetaMask Icon" /> 
            {isConnected ? "Connected" : "Connect"} to MetaMask
          </button>
        </div>
      </div>
      
      <div className="card1">
        <NetMeteringCard />
      </div>

      <div className="card2">
        <CarbonCreditCard />
      </div>
    </div>
  );
};

export default RightSidebar;
