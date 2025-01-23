import React from "react";
import Sidebar from "./SideBar.jsx";
import CentrePage from './centrePage.jsx'
const Dashboard = () => {
  return (
    <div style={{ display: "flex" ,backgroundColor: "#EDEDED"}}>
      <Sidebar />
      <CentrePage/>

      
    </div>
  );
};

export default Dashboard;
