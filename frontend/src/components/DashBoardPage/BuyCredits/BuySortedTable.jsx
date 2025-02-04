import React, { useEffect, useState } from "react";
import "../ClaimCredit/EarnCredit/EarnCreditsPopup.css";
import "../transactionstable.css";
import "./BuySortedTable.css";

const BuySortedTable = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [buyConfirmed, setBuyConfirmed] = useState([]);
  const [priceToPay, setPriceToPay] = useState(0);
  const [amountBought, setAmountBought] = useState(0);

  useEffect(() => {
    setTransactions(props.buyArray || []); // Ensure default empty array to avoid crashes
  }, [props.buyArray]);

  const handleBuyCredit = () => {
    if (buyConfirmed.length === 0) {
      alert("Cannot Buy an 0 CCT");
      return;
    }
    props.amountBought(amountBought);
    props.priceToPay(priceToPay);
    props.handleBuyCredit(buyConfirmed);
    console.log("validating one");
    props.popup(3);
  };

  // State to track the verification status of each row
  const [verificationStatus, setVerificationStatus] = useState({});

  // Initialize verification status based on transactions
  useEffect(() => {
    if (transactions.length > 0) {
      setVerificationStatus(
        transactions.reduce((acc, transaction) => {
          acc[transaction.orderId] = "Verify"; // Default state is "Verify"
          return acc;
        }, {})
      );
    }
  }, [transactions]);

  // Handle verification button click
  const handleVerify = async (seller, orderId, amountToBuy, pricePerToken) => {
    if (verificationStatus[orderId] === "Verify") {
      const response = await props.verify(seller, amountToBuy);
      if (response) {
        setVerificationStatus((prevStatus) => ({
          ...prevStatus,
          [orderId]: "Buy",
        }));
      } else {
        setVerificationStatus((prevStatus) => ({
          ...prevStatus,
          [orderId]: "Not-Verified",
        }));
      }
    } else if (verificationStatus[orderId] === "Buy") {
      // Find the transaction
      const transactionToAdd = transactions.find(
        (tx) => tx.orderId === orderId
      );

      console.log(transactionToAdd);
      if (transactionToAdd) {
        setBuyConfirmed((prevConfirmed) => [
          ...prevConfirmed,
          transactionToAdd,
        ]);
      }
      setPriceToPay(
        priceToPay +
          transactionToAdd.amountToBuy * transactionToAdd.pricePerToken
      );
      setAmountBought(amountBought + transactionToAdd.amountToBuy);
      setVerificationStatus((prevStatus) => ({
        ...prevStatus,
        [orderId]: "Added",
      }));
    }
  };

  return (
    <>
      <button className="popup-close" onClick={() => props.popup(false)}>
        &times;
      </button>
      <div className="popup-title-parent">
        <h2 className="popup-title">
          Amount:{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-lightning-fill"
            viewBox="0 0 16 16"
          >
            <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z" />
          </svg>{" "}
          {props.buyAmount} CCT
        </h2>
      </div>
      <div className="input-container transaction-container-Buy">
        <div className="table-container">
          <table className="transaction-table transaction-table-Buy">
            <thead>
              <tr>
                <th style={{ minWidth: "10%" }}>Sl. No.</th>
                <th style={{ minWidth: "20%" }}>Order ID</th>
                <th style={{ minWidth: "20%" }}>Price per Token</th>
                <th style={{ minWidth: "20%" }}>No. of Tokens</th>
                <th style={{ minWidth: "20%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.orderId}>
                  <td>{index + 1}</td>
                  <td>{transaction.orderId}</td>
                  <td>
                    {(() => {
                      const [base, exponent] = transaction.pricePerToken
                        .toExponential(5)
                        .split("e");
                      return (
                        <>
                          {base} × 10<sup>{exponent}</sup>
                        </>
                      );
                    })()}{" "}
                    ETH
                  </td>
                  <td className="positive">{transaction.amountToBuy}</td>
                  <td>
                    <button
                      className={`verify-button ${
                        verificationStatus[
                          transaction.orderId
                        ]?.toLowerCase() || ""
                      }`}
                      onClick={() =>
                        handleVerify(
                          transaction.seller,
                          transaction.orderId,
                          transaction.amountToBuy,
                          transaction.pricePerToken
                        )
                      }
                    >
                      {verificationStatus[transaction.orderId] || "Verify"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="confirm-button" onClick={handleBuyCredit}>
          BUY : Price To Pay = {(() => {
                      const [base, exponent] = priceToPay
                        .toExponential(5)
                        .split("e");
                      return (
                        <>
                          {base} × 10<sup>{exponent}</sup>
                        </>
                      );
                    })()}{" "}ETH
        </button>
      </div>
    </>
  );
};

export default BuySortedTable;
