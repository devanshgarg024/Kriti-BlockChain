import React, { useState } from "react";
import Sidebar from "./SideBar.jsx";
import RightSidebar from "./rightSideBar.jsx";
import CentrePage from "./centrePage.jsx";
import TransactionsTable from "./transactiontable.jsx";
import "./Sidebar.css";
import "./RightSidebar.css";
import "./DashBoardPage.css";

const Dashboard = () => {
  return ( 
    <div className="dashboard-conatainer">
      <Sidebar />
      <div className="centre-dashboard-div">
        <CentrePage />
        <TransactionsTable />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Dashboard;
