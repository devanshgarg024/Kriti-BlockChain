import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { id: "Dashboard", label: "Dashboard" },
    { id: "Energy Exchange", label: "Energy Exchange" },
    { id: "Payments", label: "Payments" },
    { id: "History", label: "History" },
    { id: "Settings", label: "Settings" },
    { id: "Help", label: "Help" },
    { id: "Log Out", label: "Log Out" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h2 className="sidebar-title">AMPLY</h2>
        <ul className="sidebar-list">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`sidebar-item ${activeItem === item.id ? "active" : ""}`}
              onClick={() => setActiveItem(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">TN</div>
            <div>
              <h4>Shruti Narayan</h4>
            </div>
          </div>
          <p className="user-email">hello@shrutinayaran.com</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
