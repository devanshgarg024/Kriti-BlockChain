import React from "react";
import Sidebar from "./SideBar.jsx";
import RightSidebar from "./rightSideBar.jsx";
import CentrePage from "./centrePage.jsx";
import TransactionsTable from "./transactiontable.jsx";
import "./Sidebar.css";
import "./RightSidebar.css";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#D9D9D9",
      }}
    >
      <Sidebar />
      <div
        style={{
          width: "60%",
          height: "auto",
          position: "relative",
          left: "18.5%",
          gap:"1%",
        }}
      >
        <CentrePage />
        <TransactionsTable />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Dashboard;
