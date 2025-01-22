import React, { useState, useEffect } from "react";
import "./centrePage.css";
import graphImage from "./images/graph.png"



const CentrePage = () => {
  const [credits, setCredits] = useState(95000);
  const [tokenAmount, setTokenAmount] = useState("");
  const [tab, setTab] = useState("month");
  const [activeNav, setActiveNav] = useState("claimCredits");
  const [lastPayment, setLastPayment] = useState(0);
  const [availableCredits, setAvailableCredits] = useState(0);
  const [unit, setUnit] = useState("CCT");



  
  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/credits"); // Replace with your backend API endpoint
        const data = await response.json();

        // Update the state with fetched data
        setCredits(data.totalCredits);
        setLastPayment(data.lastPayment);
        setAvailableCredits(data.availableCredits);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };

    fetchData();
  }, []);

  const handleTokenChange = (e) => {
    setTokenAmount(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const payCarbonCredit = () => {
    if (!isNaN(tokenAmount) && tokenAmount !== "") {
      setCredits(credits - parseInt(tokenAmount));
      setTokenAmount("");
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <ul className="nav-credits">
          <li
            className={activeNav === "claimCredits" ? "active" : ""}
            onClick={() => setActiveNav("claimCredits")}
          >
            Claim Credits
          </li>
          <li
            className={activeNav === "sellCredits" ? "active" : ""}
            onClick={() => setActiveNav("sellCredits")}
          >
            Sell Credits
          </li>
          <li
            className={activeNav === "buyCredits" ? "active" : ""}
            onClick={() => setActiveNav("buyCredits")}
          >
            Buy Credits
          </li>
          <li
            className={activeNav === "allTransactions" ? "active" : ""}
            onClick={() => setActiveNav("allTransactions")}
          >
            All Transactions
          </li>
        </ul>
        <ul className="nav-dates">
          <li
            className={tab === "week" ? "active" : ""}
            onClick={() => setTab("week")}
          >
            Week
          </li>
          <li
            className={tab === "month" ? "active" : ""}
            onClick={() => setTab("month")}
          >
            Month
          </li>
          <li
            className={tab === "year" ? "active" : ""}
            onClick={() => setTab("year")}
          >
            Year
          </li>
        </ul>
      </nav>

      <div className="main-content">
        <div className="left-section">
          <p>
            Earn <strong>Carbon Credit Tokens </strong>
            to offset your footprint or trade them in the marketplace
          </p>
          <button className="earn-credit">Earn Credit</button>
        </div>
        <div className="mid-section">
          <p>
            Total <strong>Carbon Credit</strong> due for April, 2025:
          </p>
          <h5 className="primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-lightning-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
            </svg>{" "}
            {credits} CCT
          </h5>
          <div className="pay-section">
            <input
              type="text"
              placeholder="Enter token amount"
              value={tokenAmount}
              onChange={handleTokenChange}
              className="token-input"
            />
            <select
              value={unit}
              onChange={handleUnitChange}
              className="unit-select"
            >
              <option value="CCT" >CCT
              </option>
              <option value="KWH">KWH</option>
            </select>
            <button className="pay-credit" onClick={payCarbonCredit}>
              Pay Carbon Credit
            </button>
          </div>
        </div>
        <div className="right-section">
          <div className="error-div">
            <p>Last credit payment</p>
            <h6 className="error">{lastPayment} CCT</h6>
          </div>
          <div className="success-div">
            <p>Available credits</p>
            <h6 className="success">{availableCredits} CCT</h6>
          </div>
        </div>
      </div>
      <div className="graph-container">
      <img src={graphImage} alt="Graph-Image" className="graph-image"/>
      </div>
    </div>
  );
};

export default CentrePage;
