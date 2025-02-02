import React, { useState } from "react";
import "../ClaimCredit/EarnCredit/EarnCreditsPopup.css";
import "../transactionstable.css";
import "./BuySortedTable.css";

const BuySortedTable = (props) => {
  const handleBuyCredit = () => {
    return props.popup(3);
  };

  const transactions = [
    {
      id: 1,
      orderId: "ORD123",
      time: "2024-02-01 12:00",
      pricePerToken: 50.5,
      transaction: 100,
    },
    {
      id: 2,
      orderId: "ORD124",
      time: "2024-02-01 14:00",
      pricePerToken: 49.8,
      transaction: -200,
    },
    {
      id: 3,
      orderId: "ORD125",
      time: "2024-02-01 15:30",
      pricePerToken: 52.3,
      transaction: 150,
    },
    {
      id: 4,
      orderId: "ORD125",
      time: "2024-02-01 15:30",
      pricePerToken: 52.3,
      transaction: 150,
    },
    {
      id: 5,
      orderId: "ORD125",
      time: "2024-02-01 15:30",
      pricePerToken: 52.3,
      transaction: 150,
    },
    {
      id: 6,
      orderId: "ORD125",
      time: "2024-02-01 15:30",
      pricePerToken: 52.3,
      transaction: 150,
    },
    {
      id: 7,
      orderId: "ORD125",
      time: "2024-02-01 15:30",
      pricePerToken: 52.3,
      transaction: 150,
    },
    {
      id: 8,
      orderId: "ORD125",
      time: "2024-02-01 15:30",
      pricePerToken: 52.3,
      transaction: 150,
    },
  ];

  // State to track the verification status of each row
  const [verificationStatus, setVerificationStatus] = useState(
    transactions.reduce((acc, transaction) => {
      acc[transaction.id] = "Verify"; // Default state is "Verify"
      return acc;
    }, {})
  );

  // Handle verification button click
  const handleVerify = (id) => {
    setVerificationStatus((prevStatus) => ({
      ...prevStatus,
      [id]: prevStatus[id] === "Verify" ? "Buy":"Not-Verified",
    }));
  };

  return (
    <>
      <button className="popup-close" onClick={() => props.popup(false)}>
        &times;
      </button>
      <div className="popup-title-parent">
        <h2 className="popup-title">
          Amount :{" "}
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
          {props.buyamount} CCT
        </h2>
      </div>
      <div className="input-container transaction-container-Buy">
        <div className="table-container ">
          <table className="transaction-table transaction-table-Buy">
            <thead>
              <tr>
                <th style={{ minWidth: "10%" }}>Sl. No.</th>
                <th style={{ minWidth: "20%" }}>Order ID</th>
                <th style={{ minWidth: "20%" }}>Price per Token</th>
                <th style={{ minWidth: "20%" }}>No Of Tokens</th>
                <th style={{ minWidth: "20%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td>{index + 1}</td>
                  <td>{transaction.orderId}</td>
                  <td>₹{transaction.pricePerToken.toFixed(2)}</td>
                  <td
                    className={
                      "positive"
                    }
                  >
                    {transaction.transaction > 0 ? "+ " : "- "}
                    {Math.abs(transaction.transaction).toFixed(2)}
                  </td>
                  <td>
                    <button
                      className={`verify-button ${verificationStatus[
                        transaction.id
                      ].toLowerCase()}`}
                      onClick={() => handleVerify(transaction.id)}
                    >
                      {verificationStatus[transaction.id]}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="confirm-button" onClick={handleBuyCredit}>
          Next
        </button>
      </div>
    </>
  );
};

export default BuySortedTable;
