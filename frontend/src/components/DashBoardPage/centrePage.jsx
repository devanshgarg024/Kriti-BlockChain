import React, { useState, useEffect } from "react";
import ClaimCredit from "./ClaimCredit/ClaimCredit.jsx";
import SellCredit from "./SellCredit/SellCredit.jsx";
import "./centrePage.css";
import graphImage from "./images/graph.png";

const CentrePage = (props) => {
  const [credits, setCredits] = useState(95000);
  const [tokenAmount, setTokenAmount] = useState("");
  const [tab, setTab] = useState("month");
  const [activeNav, setActiveNav] = useState("claimCredits");
  const [isDeviceRegistered, setIsDeviceRegistered] = useState("Register Device");
  const [lastPayment, setLastPayment] = useState(0);
  const [availableCredits, setAvailableCredits] = useState(0);
  const [unit, setUnit] = useState("CCT");
  // const [pageoptions, setPageOptions] = useState(["Claim","Sell","Buy","AllTxn"]);

  // Fetch data from the backend
  useEffect(() => {
setAvailableCredits(props.userCCT);

  }, [props.userCCT]);

  useEffect(() => {

    setIsDeviceRegistered("Device Registered");
    props.popupEarn(0);
    setActiveNav("claimCredits");
    
      }, [props.deviceRegistered]);

  useEffect(() => {
    if(activeNav==="RegisterDevice"){
      props.popupEarn(4);
    }
    else if(activeNav==="sellCredits"){
      props.popup(5);
    }
    
      }, [activeNav]);
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

// const CallSellCredit = ()=>{
//   return ();
// }

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
            onClick={() => (props.popupSell(1))&&(setActiveNav("SellCredits"))}
          >
            Sell Credits
          </li>
          <li
            className={activeNav === "buyCredits" ? "active" : ""}
            onClick={() => (props.popupBuy(1))&&(setActiveNav("buyCredits"))}
          >
            Buy Credits
          </li>
          <li
            className={activeNav === "allTransactions" ? "active" : ""}
            onClick={() => setActiveNav("RegisterDevice")}
          >
            Register Device
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
      <ClaimCredit
        credits={availableCredits}
        tokenAmount={tokenAmount}
        handleTokenChange={handleTokenChange}
        unit={unit}
        handleUnitChange={handleUnitChange}
        payCarbonCredit={payCarbonCredit}
        lastPayment={lastPayment}
        availableCredits={availableCredits}
        popup={props.popupEarn}
      />
      </div>
      <div className="graph-container">
        <img src={graphImage} alt="Graph-Image" className="graph-image" />
      </div>
    </div>
  );
};

export default CentrePage;
