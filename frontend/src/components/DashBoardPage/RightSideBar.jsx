import React, { useState, useEffect } from "react";
import "./RightSideBar.css";
import NetMeteringCard from "./NetMeteringCard";
import CarbonCreditCard from "./CarbonCreditCard";

const RightSidebar = (props) => {
  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    setUser(props.userData);
  }, [props.userData]);

  const handleMetamaskLogin = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is not installed. Please install it to use this feature.");
      return;
    }

    try {
      // Request accounts
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const selectedAccount = accounts[0];
      setAccount(selectedAccount);
      console.log("Connected account:", selectedAccount);

      // Request balance
      const result = await ethereum.request({
        method: "eth_getBalance",
        params: [selectedAccount, "latest"],
      });
      const wei = parseInt(result, 16);
      const ethBalance = wei / 10 ** 18;
      setBalance(ethBalance.toFixed(4)); // Display up to 4 decimal places
      console.log("Balance:", ethBalance + " ETH");
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
          <button className="metamask-button" onClick={handleMetamaskLogin}>
            <img src="https://metamask.io/assets/icon.svg" alt="MetaMask Icon" /> Connect to
            MetaMask
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
