import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractABI = [/* Add your contract ABI here */];
const contractAddress = "0xYourContractAddress"; // Replace with your contract address

const App = () => {
  const [userWalletAddress, setUserWalletAddress] = useState("");
  const [energyProduced, setEnergyProduced] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [status, setStatus] = useState("");
  const [events, setEvents] = useState([]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setUserWalletAddress(accounts[0]);
        setStatus(Connected: ${accounts[0]});
      } catch (error) {
        setStatus("Connection failed. Please try again.");
      }
    } else {
      setStatus("MetaMask not detected.");
    }
  };

  const handleEarnCarbonCredit = async () => {
    if (!userWalletAddress || !energyProduced || !timestamp) {
      setStatus("Please fill in all fields.");
      return;
    }

    try {
      // Log smart meter data on backend
      const response = await fetch("http://localhost:3000/logSmartMeterData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userWalletAddress,
          energyProduced,
          timestamp,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        setStatus("Failed to log smart meter data.");
        return;
      }

      setStatus(Data logged successfully. Txn: ${data.transactionHash});

      // Trigger earnCarbonCredit on blockchain
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.earnCarbonCredit(
        energyProduced,
        timestamp
      );

      setStatus(Transaction sent: ${tx.hash});
      await tx.wait();
      setStatus(Transaction confirmed.);
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    // Listen for CarbonCreditsMinted events
    contract.on("CarbonCreditsMinted", (user, energy, credits) => {
      const message = CarbonCreditsMinted: User ${user} earned ${credits.toString()} credits for ${energy.toString()} energy.;
      setEvents((prevEvents) => [...prevEvents, message]);
    });

    // Listen for SmartMeterDataLogged events
    contract.on("SmartMeterDataLogged", (producer, time, energy, logger) => {
      const message = `SmartMeterDataLogged: Producer ${producer} logged ${energy.toString()} energy at ${new Date(
        time * 1000
      ).toLocaleString()} by ${logger}.`;
      setEvents((prevEvents) => [...prevEvents, message]);
    });

    // Cleanup listeners on component unmount
    return () => {
      contract.removeAllListeners("CarbonCreditsMinted");
      contract.removeAllListeners("SmartMeterDataLogged");
    };
  }, []);

  return (
    <div className="App">
      <h1>Earn Carbon Credits</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEarnCarbonCredit();
        }}
      >
        <div>
          <label>Energy Produced (kWh):</label>
          <input
            type="number"
            value={energyProduced}
            onChange={(e) => setEnergyProduced(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Timestamp (UNIX):</label>
          <input
            type="number"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            required
          />
        </div>
        <button type="submit">Earn Carbon Credits</button>
      </form>
      <p>Status: {status}</p>
      <h2>Event Logs</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;