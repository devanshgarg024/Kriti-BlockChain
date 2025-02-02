import React, { useState, useEffect } from "react";
import "./TransactionsTable.css";
import axios from "axios";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filter, setFilter] = useState("All");
  const [verificationStatus, setVerificationStatus] = useState({});
  const [userId, setUserId] = useState("user123"); // Replace this with the actual logged-in user's ID

  useEffect(() => {
    async function getTableData() {
      try {
        const response = await axios.get("http://localhost:8080/sellOrder");

        if (Array.isArray(response.data.data)) {
          setTransactions(response.data.data);

          // Initialize verification status
          const initialStatus = response.data.data.reduce((acc, transaction) => {
            acc[transaction._id] = "Verify";
            return acc;
          }, {});
          setVerificationStatus(initialStatus);
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

  // Toggle verification status
  const handleVerifyClick = (id) => {
    setVerificationStatus((prevStatus) => ({
      ...prevStatus,
      [id]: prevStatus[id] === "Verify" ? "Buy":"Not-Verified",
    }));
  };

  // Delete transaction
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deleteOrder/${id}`);
      setTransactions((prevTransactions) => prevTransactions.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Filter transactions based on "My Orders" or "All Orders"
  const filteredTransactions = transactions.filter((transaction) =>
    filter === "My Orders" ? transaction.userId === userId : true
  );

  return (
    <div className="transaction-section">
      <div className="navbar">
        <div className="nav-buttons">
          <button
            className={`filter-button ${filter === "My Orders" ? "active" : ""}`}
            onClick={() => setFilter("My Orders")}
          >
            My Orders
          </button>
          <button
            className={`filter-button ${filter === "All" ? "active" : ""}`}
            onClick={() => setFilter("All")}
          >
            All Orders
          </button>
        </div>
        <div className="filter-dropdown">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Aborted">Aborted</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th style={{ minWidth: "10%" }}>Sl. No.</th>
              <th style={{ minWidth: "20%" }}>Order ID</th>
              <th style={{ minWidth: "30%" }}>Time</th>
              <th style={{ minWidth: "20%" }}>Price per Token</th>
              <th style={{ minWidth: "20%" }}>Amount to Sell</th>
              <th style={{ minWidth: "20%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={transaction._id}>
                <td>{index + 1}</td>
                <td>{transaction.orderId}</td>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                <td>₹{transaction.pricePerToken.toFixed(5)}</td>
                <td>{transaction.amountToSell}</td>
                <td>
                  {transaction.userId === userId ? (
                    // Show delete button if order belongs to user
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(transaction._id)}
                    >
                      Delete
                    </button>
                  ) : (
                    // Show verify button for non-user orders
                    <button
                      className={`verify-button ${verificationStatus[transaction._id].toLowerCase()}`}
                      onClick={() => handleVerifyClick(transaction._id)}
                    >
                      {verificationStatus[transaction._id]}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
