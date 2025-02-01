import React, { useState, useEffect } from "react";
import "./TransactionsTable.css";
import axios from "axios";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function getTableData() {
      try {
        const response = await axios.get("http://localhost:8080/sellOrder");

        // Ensure that response data is an array before setting state
        if (Array.isArray(response.data.data)) {
          setTransactions(response.data.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setTransactions([]); // Ensure it's always an array
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]); // Set an empty array to prevent errors
      }
    }

    getTableData();
  }, []);

  // Ensure transactions is an array before filtering
  const filteredTransactions = Array.isArray(transactions)
    ? transactions.filter((transaction) =>
        filter === "All" ? true : transaction.status === filter
      )
    : [];

  // Toggle row selection for checkboxes
  const toggleRowSelection = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  // Toggle all selections
  const toggleSelectAll = () => {
    if (!Array.isArray(filteredTransactions)) return;

    const allVisibleIds = filteredTransactions.map((transaction) => transaction._id);
    if (allVisibleIds.every((id) => selectedRows.includes(id))) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((id) => !allVisibleIds.includes(id))
      );
    } else {
      setSelectedRows((prevSelectedRows) => [...new Set([...prevSelectedRows, ...allVisibleIds])]);
    }
  };

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
              <th>
                <input
                  type="checkbox"
                  checked={
                    Array.isArray(filteredTransactions) &&
                    filteredTransactions.length > 0 &&
                    filteredTransactions.every((transaction) =>
                      selectedRows.includes(transaction._id)
                    )
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th style={{ minWidth: "10%" }}>Sl. No.</th>
              <th style={{ minWidth: "20%" }}>Order ID</th>
              <th style={{ minWidth: "30%" }}>Time</th>
              <th style={{ minWidth: "20%" }}>Price per Token</th>
              <th style={{ minWidth: "20%" }}>Amount to Sell</th>
              <th style={{ minWidth: "20%" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr
                key={transaction._id}
                className={selectedRows.includes(transaction._id) ? "selected-row" : ""}
              >
                <td>
                  <input
                    className="checkBox"
                    type="checkbox"
                    checked={selectedRows.includes(transaction._id)}
                    onChange={() => toggleRowSelection(transaction._id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{transaction.orderId}</td>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                <td>₹{transaction.pricePerToken.toFixed(5)}</td>
                <td>{transaction.amountToSell}</td>
                <td>
                  <span
                    className={`status-badge ${
                      transaction.status === "Completed"
                        ? "completed"
                        : transaction.status === "Aborted"
                        ? "aborted"
                        : "pending"
                    }`}
                  >
                    {transaction.status || "Pending"}
                  </span>
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
