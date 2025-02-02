import React, { useState,useEffect } from "react";
import Sidebar from "./SideBar.jsx";
import RightSidebar from "./RightSideBar.jsx";
import CentrePage from "./centrePage.jsx";
import TransactionsTable from "./transactiontable.jsx";
import EarnCreditsPopup from "./ClaimCredit/EarnCredit/EarnCreditsPopup.jsx";
import ValidatingPopup from "./ClaimCredit/EarnCredit/ValidatingPopup.jsx";
import ConfirmPopUp from "./ClaimCredit/EarnCredit/ConfirmPopup.jsx";
import RegisterDevicePopUp from "./RegisterDevicePopUp.jsx";
import SetTokenRate from "./SellCredit/popups/SetTokenRate.jsx";
import SellCreditsPopup from "./SellCredit/popups/SellCreditPopUp.jsx";
import SellConfirmPopUp from "./SellCredit/popups/SellConfirmPopup.jsx";
import SellSuccessfull from "./SellCredit/popups/SellSuccessfull.jsx";
import BuyCreditsPopup from "./BuyCredits/BuyCreditsPopup.jsx";
import BuySortedTable from "./BuyCredits/BuySortedTable.jsx";
import BuySuccessfull from "./BuyCredits/BuySuccessfull.jsx";
import axios from "axios";
import contractArtifact from "../../blockchain_files/CCToken.json";
import { ethers } from "ethers";

import "./Sidebar.css";
import "./RightSidebar.css";
import "./DashBoardPage.css";

const Dashboard = (e) => {
  const [showEarnCreditPopup, setShowEarnCreditPopup] = useState(0);
  const [showSellCreditPopup, setShowSellCreditPopup] = useState(0);
  const [buyArray, setBuyArray] = useState([]);
  const [account, setAccount] = useState(null);
  const [orderId, setOrderId] = useState(0);
  const [amountToSell, setAmountToSell] = useState(0);
  const [showBuyCreditPopup, setShowBuyCreditPopup] = useState(0);
  const [availableCredits, setAvailableCredits] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [myTransactions, setMyTransactions] = useState([]);
  const [deviceRegistered, setDeviceRegistered] = useState(false);
  const [buyAmount, setBuyAmount] = useState(0);

  const contractABI = contractArtifact.abi;
  const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;


  useEffect(() => {
    async function getTableData() {
      try {
        const response = await axios.get("http://localhost:8080/sellOrder");

        if (Array.isArray(response.data.data)) {
          const sortedTransactions = response.data.data.sort((a, b) => a.pricePerToken - b.pricePerToken);
          setTransactions(sortedTransactions);

          // Initialize verification status

        } else {
          console.error("Unexpected data format:", response.data);
          setTransactions([]);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]);
      }
    }

    getTableData();
  }, []);

  const handleVerify= async (seller,amntToSell)=>{

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      contractABI,
      signer
    );
    const avlbleCred=await contract.balanceOf(seller);
    const ac2 = BigInt(Math.round(Number(avlbleCred)));
    const am2 = BigInt(Math.round(Number(amntToSell) * 1e18));
    try {
      const response = await axios.post(
        "http://localhost:8080/handleGenerateAndVerifyProof",
        {
          amountToSell: am2.toString(),
          totalBalance: ac2.toString(),
        }
      );

      console.log("Response:", response.data);
      if (response.data.Output === "0") {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error in proof generation:", error);
      return; // Exit function early if an error occurs
    }

  }

  const handleSellCredit = async (pricePerToken) => {
    try {
      const am = ethers.parseUnits(amountToSell.toFixed(18), 18);

      const ac2 = BigInt(Math.round(Number(availableCredits)));
      const am2 = BigInt(Math.round(Number(amountToSell) * 1e18));

      try {
        const response = await axios.post(
          "http://localhost:8080/handleGenerateAndVerifyProof",
          {
            amountToSell: am2.toString(),
            totalBalance: ac2.toString(),
          }
        );

        console.log("Response:", response.data);

        if (response.data.Output === "0") {
          alert("Insufficient Credits");
          return; // Exit function early
        }
      } catch (error) {
        console.error("Error in proof generation:", error);
        return; // Exit function early if an error occurs
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI,
        signer
      );
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
      const event = receipt.logs.find(
        (log) => log.fragment.name === "SellOrderPlaced"
      );

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
        const orderResponse = await axios.post(
          "http://localhost:8080/sellOrder",
          {
            orderId: orderId,
            seller: account,
            amountToSell: amountToSell,
            pricePerToken: pricePerToken,
            timestamp: timestamp,
          }
        );

        console.log("Order Response:", orderResponse.data);
      } catch (error) {
        console.error("Error in placing sell order:", error);
        return; // Exit function early if an error occurs
      }

      setShowSellCreditPopup(4);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };
  const popupEarn = (x) => {
    setShowEarnCreditPopup(x);
  };
  const popupSell = (x) => {
    setShowSellCreditPopup(x);
  };
  const popupBuy = (x) => {
    setShowBuyCreditPopup(x);
  };

  const handleEarnCredit = async (energyProduced) => {
    setShowEarnCreditPopup(2);

    let userWalletAddress = null;
    await fetch("http://localhost:8080/getWalletAddress")
      .then((response) => response.json()) // Parse the JSON from the response
      .then((data) => {
        userWalletAddress = data.walletAddress;
        // Use the data as needed
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    const timestamp = Date.now();

    await axios
      .post("http://localhost:8080/logSmartMeterData", {
        userWalletAddress: userWalletAddress,
        energyProduced: energyProduced,
        timestamp: timestamp,
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const provider = new ethers.BrowserProvider(window.ethereum); // For ethers v6
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

    const tx = await contract.earnCarbonCredit(energyProduced, timestamp);
    console.log(`earn credit Transaction sent: ${tx.hash}`);
    await tx.wait();
    console.log(`earn credit Transaction confirmed`);
    setShowEarnCreditPopup(3);
    let userCredits = await contract.balanceOf(userWalletAddress);
    setAvailableCredits(userCredits);
    console.log(userCredits);
  };

  //

  // const handleSellCredit = async () => {
  //   setShowSellCreditPopup(2);
  //   setTimeout(5000);
  //   setShowSellCreditPopup(3);
  // };
  // const buyOrder=async(orderId,amountToBuy,pricePerToken)=>{
    
  //   const provider = new ethers.BrowserProvider(window.ethereum);
  //   const signer = await provider.getSigner();
  //   const contract = new ethers.Contract(
  //     CONTRACT_ADDRESS,
  //     contractABI,
  //     signer
  //   );
  //   console.log(amountToBuy);
  //   // const ps = ethers.parseUnits(pricePerToken.toFixed(18), 18);
  //   // const am = ethers.parseUnits(amountToBuy.toFixed(18), 18);
  //   // const totalPrice = am * ps;
  //   // Convert total price to wei (BigInt)
  //   const totalPrice = ethers.parseUnits((amountToBuy * pricePerToken).toFixed(18), 18);

  //   console.log("Total Price (wei):", totalPrice.toString());

  //   // Send transaction with properly formatted value
  //   const tx = await contract.fulfillSellOrder(orderId, amountToBuy, { value: totalPrice });
    
  //   console.log(`Transaction sent: ${tx.hash}`);
  //   await tx.wait();
  //   console.log("Transaction confirmed");

  // }

  const buyOrder =  async(orderId, amountToBuy, pricePerToken) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer =  await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

    console.log(`OrderId is :- ${orderId}`);
    console.log("Amount to Buy:", amountToBuy);
    console.log("Price per Token:", pricePerToken);

    // // Ensure amountToBuy and pricePerToken are Numbers before conversion
    // const amountBN = ethers.parseUnits(amountToBuy.toFixed(18), 18);
    // const priceBN = ethers.parseUnits(pricePerToken.toFixed(18), 18);

    // Convert amountToBuy & pricePerToken to BigInt (in wei)
    const amountBN = BigInt(Math.round(amountToBuy * 1e18)); 
    const priceBN = BigInt(Math.round(pricePerToken * 1e18));

    // Compute total price in wei (BigInt)
    const totalPrice = (amountBN * priceBN) / BigInt(1e18);

    // // Compute the total price in wei (BigInt)
    // const totalPrice = (amountBN * priceBN) / ethers.parseUnits("1", 18); // Correct scaling

    console.log(`Total Price (wei):${totalPrice}`);

    // Send transaction with correctly formatted value
const sellOrdersCount = await contract.sellOrders.length;
    
    console.log(`Total Sell Orders: ${sellOrdersCount}`);

    let orders = [];
    for (let i = 0; i < sellOrdersCount; i++) {
        const order = await contract.sellOrders(i); // Fetch each order by index

        orders.push({
            orderId: i,
            seller: order.seller,
            amount: Number(order.amount), // Convert BigInt to number
            pricePerToken: Number(order.pricePerToken) / 1e18, // Convert from wei to ETH
            fulfilled: order.fulfilled,
        });
    }

    console.log("Sell Orders:", orders);


    const tx = await contract.fulfillSellOrder(orderId, amountBN , { value: totalPrice });

    console.log(`Transaction sent: ${tx.hash}`);
    await tx.wait();
    console.log("Transaction confirmed");

  };

  const getOrdersToFulfill = (sellOrders, targetAmount) => {
    let accumulatedAmount = 0;
    let selectedOrders = [];

    for (let order of sellOrders) {
        if (accumulatedAmount >= targetAmount) break; // Stop when the target is met

        let amountToTake = Math.min(order.amountToSell, targetAmount - accumulatedAmount);
        accumulatedAmount += amountToTake;

        selectedOrders.push({
            ...order,
            amountToBuy: amountToTake // Add the portion being taken
        });
    }

    return selectedOrders;
};
  const handleBuyAmount = async (buyamount) => {
    const sortedTransactions = transactions.sort((a, b) => a.pricePerToken - b.pricePerToken);
    setBuyArray(getOrdersToFulfill(sortedTransactions,buyamount));
    setBuyAmount(buyamount);
    setShowBuyCreditPopup(2);
  };

  const handleBuyCredit = async (buyConfirmed) => {
    console.log(buyConfirmed);
    const orderIds = buyConfirmed.map(tx => tx.orderId);
    const amountsToBuy = buyConfirmed.map(tx => BigInt(Math.round(tx.amountToBuy * 1e18)));
    const pricesPerToken = buyConfirmed.map(tx => BigInt(Math.round(tx.pricePerToken * 1e18)));
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      contractABI,
      signer
    );
    const tx = await contract.fulfillBatchOrders(orderIds, amountsToBuy, pricesPerToken);
    
    console.log(`Transaction sent: ${tx.hash}`);
    await tx.wait();
    console.log(`Transaction confirmed`);
    setShowBuyCreditPopup(4);
  };
  async function connectedToMetamask(acnt) {
    setAccount(acnt);
    const provider = new ethers.BrowserProvider(window.ethereum); // For ethers v6
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
    const userCredits = await contract.balanceOf(acnt);
    setAvailableCredits(userCredits);
  }
  function deviceRegister(x) {
    setDeviceRegistered(x);
  }
  function handleAmountToSell(x) {
    setAmountToSell(x);
  }
  return (
    <>
      {showEarnCreditPopup != 0 ? (
        <>
          <div className="popup-overlay" onClick={() => popupEarn(false)}></div>
          <div className="earnCreditPopup">
            {showEarnCreditPopup === 1 ? (
              <EarnCreditsPopup
                popup={popupEarn}
                handleEarnCredit={handleEarnCredit}
              />
            ) : showEarnCreditPopup === 2 ? (
              <ValidatingPopup popup={popupEarn} />
            ) : showEarnCreditPopup === 3 ? (
              <ConfirmPopUp popup={popupEarn} />
            ) : (
              <RegisterDevicePopUp
                popup={popupEarn}
                deviceRegistered={deviceRegister}
              />
            )}
          </div>
        </>
      ) : showSellCreditPopup != 0 ? (
        <>
          <div className="popup-overlay" onClick={() => popupSell(false)}></div>
          <div className="earnCreditPopup">
            {showSellCreditPopup === 1 ? (
              <SellCreditsPopup
                popup={popupSell}
                handleSellCredit={handleAmountToSell}
                availableCredits={availableCredits}
              />
            ) : showSellCreditPopup === 2 ? (
              <SetTokenRate
                popup={popupSell}
                handleSellCredit={handleSellCredit}
              />
            ) : showSellCreditPopup === 3 ? (
              <ValidatingPopup popup={popupSell} />
            ) : showSellCreditPopup === 4 ? (
              <SellConfirmPopUp
                popup={popupSell}
                handleSellCredit={handleSellCredit}
              />
            ) : (
              <SellSuccessfull
                popup={popupSell}
                handleSellCredit={handleSellCredit}
              />
            )}
          </div>
        </>
      ) : (
        showBuyCreditPopup != 0 && (
          <>
            <div
              className="popup-overlay"
              onClick={() => popupBuy(false)}
            ></div>
            <div className="earnCreditPopup">
              {showBuyCreditPopup === 1 ? (
                <BuyCreditsPopup
                  popup={popupBuy}
                  handleBuyAmount={handleBuyAmount}
                />
              ) : showBuyCreditPopup === 2 ? (
                <BuySortedTable
                  popup={popupBuy}
                  handleBuyCredit={handleBuyCredit}
                  buyArray={buyArray}
                  buyAmount={buyAmount}
                  verify={handleVerify}
                />
              ) : showBuyCreditPopup === 3 ? (
                <>
                  <ValidatingPopup popup={popupBuy} />
                  {setTimeout(() => popupBuy(4), 5000) && null}
                </>
              ) : (
                <BuySuccessfull
                  popup={popupBuy}
                  handleBuyCredit={handleBuyCredit}
                />
              )}
            </div>
          </>
        )
      )}
      <div className="dashboard-conatainer">
        <Sidebar userData={e.userData[0]} />
        <div className="centre-dashboard-div">
          <CentrePage
            userData={e.userData[0]}
            popupEarn={popupEarn}
            popupSell={popupSell}
            popupBuy={popupBuy}
            userCCT={availableCredits}
            deviceRegistered={deviceRegistered}
          />
          <TransactionsTable userData={e.userData} transactions={transactions} verify={handleVerify} buyOrder={buyOrder} account ={account}/>
        </div>
        <RightSidebar
          userData={e.userData[0]}
          connectedToMetamask={connectedToMetamask}
        />
      </div>
    </>
  );
};

export default Dashboard;
