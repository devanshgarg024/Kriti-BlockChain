import React from "react";
import Sidebar from "./SideBar.jsx";
import CentrePage from './centrePage.jsx'
const Dashboard = (e) => {
  return (
    <div style={{ display: "flex" ,backgroundColor: "#EDEDED"}}>
      <Sidebar userData={e.userData} />
      <CentrePage userData={e.userData}/>

      
    </div>
  );
};

export default Dashboard;
