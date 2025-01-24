import React from "react";
import Sidebar from "./SideBar.jsx";
import CentrePage from './centrePage.jsx'
const Dashboard = (e) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Sidebar userData={e.userData} />
      <CentrePage userData={e.userData}/>
      <RightSidebar />

      

    </div>
  );
};

export default Dashboard;
