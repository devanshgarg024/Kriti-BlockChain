import React, { useState } from "react";
import Sidebar from "./SideBar.jsx";
import RightSidebar from "./RightSideBar.jsx";
import CentrePage from "./centrePage.jsx";
import TransactionsTable from "./transactiontable.jsx";
import "./Sidebar.css";
import "./RightSidebar.css";
import "./DashBoardPage.css";

const Dashboard = (e) => {
  return ( 
    <div className="dashboard-conatainer">
      <Sidebar userData={e.userData} />
      <div className="centre-dashboard-div">
        <CentrePage userData={e.userData} />
        <TransactionsTable userData={e.userData} />
      </div>
      <RightSidebar userData={e.userData} />
    </div>
  );
};

export default Dashboard;
