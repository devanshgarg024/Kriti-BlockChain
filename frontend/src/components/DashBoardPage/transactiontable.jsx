import React, { useState } from "react";
import "./TransactionsTable.css";

const TransactionsTable = () => {
  const initialTransactions = [
    {
      id: 1,
      orderId: "VT112087590",
      time: "22:17:37 | 15.09.2024",
      pricePerToken: 25.67,
      transaction: 2765.98,
      status: "Completed",
    },
    {
      id: 2,
      orderId: "VT112087591",
      time: "23:10:15 | 16.09.2024",
      pricePerToken: 30.45,
      transaction: -1453.5,
      status: "Aborted",
    },
    {
      id: 3,
      orderId: "VT112087592",
      time: "12:30:45 | 17.09.2024",
      pricePerToken: 28.0,
      transaction: 3200.0,
      status: "Completed",
    },
    {
      id: 4,
      orderId: "VT112087593",
      time: "14:15:22 | 18.09.2024",
      pricePerToken: 22.1,
      transaction: -800.75,
      status: "Aborted",
    },
    {
      id: 5,
      orderId: "VT112087594",
      time: "09:45:10 | 19.09.2024",
      pricePerToken: 26.5,
      transaction: 1500.25,
      status: "Completed",
    },
    {
      id: 6,
      orderId: "VT112085594",
      time: "09:45:10 | 19.09.2024",
      pricePerToken: 26.5,
      transaction: 1500.25,
      status: "Completed",
    },
    {
      id: 7,
      orderId: "VT112087504",
      time: "09:45:10 | 19.09.2024",
      pricePerToken: 26.5,
      transaction: 1500.25,
      status: "Completed",
    },
  ];

  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filter, setFilter] = useState("All");

  const toggleRowSelection = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const toggleSelectAll = () => {
    const allVisibleIds = filteredTransactions.map(
      (transaction) => transaction.id
    );
    if (allVisibleIds.every((id) => selectedRows.includes(id))) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((id) => !allVisibleIds.includes(id))
      );
    } else {
      setSelectedRows((prevSelectedRows) => [
        ...new Set([...prevSelectedRows, ...allVisibleIds]),
      ]);
    }
  };

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((transaction) => transaction.status === filter);

  return (
    <div className="transaction-section">
      <div className="navbar">
        <div className="nav-buttons">
          <button
            className={`filter-button ${
              filter === "My Orders" ? "active" : ""
            }`}
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
                  checked={filteredTransactions.every((transaction) =>
                    selectedRows.includes(transaction.id)
                  )}
                  onChange={toggleSelectAll}
                />
              </th>
              <th style={{ minWidth: "10%" }}>Sl. No.</th>
              <th style={{ minWidth: "20%" }}>Order ID</th>
              <th style={{ minWidth: "30%" }}>Time</th>
              <th style={{ minWidth: "20%" }}>Price per Token</th>
              <th style={{ minWidth: "20%" }}>Transaction</th>
              <th style={{ minWidth: "20%" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={
                  selectedRows.includes(transaction.id) ? "selected-row" : ""
                }
              >
                <td>
                  <input
                    className="checkBox"
                    type="checkbox"
                    checked={selectedRows.includes(transaction.id)}
                    onChange={() => toggleRowSelection(transaction.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{transaction.orderId}</td>
                <td>{transaction.time}</td>
                <td>₹{transaction.pricePerToken.toFixed(2)}</td>
                <td
                  className={
                    transaction.transaction > 0 ? "positive" : "negative"
                  }
                >
                  {transaction.transaction > 0 ? "+ " : "- "}
                  {Math.abs(transaction.transaction).toFixed(2)}
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      transaction.status === "Completed"
                        ? "completed"
                        : transaction.status === "Aborted"
                        ? "aborted"
                        : ""
                    }`}
                  >
                    {transaction.status}
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
