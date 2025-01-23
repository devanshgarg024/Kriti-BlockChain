import React from "react";
import Sidebar from "./SideBar.jsx";
import RightSidebar from "./RightSidebar.jsx";
import "./Sidebar.css";
import "./RightSidebar.css";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Sidebar />
      <RightSidebar />
      

    </div>
  );
};

export default Dashboard;
