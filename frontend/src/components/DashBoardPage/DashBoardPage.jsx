import React, { useState } from "react";
import Sidebar from "./SideBar.jsx";
import RightSidebar from "./RightSideBar.jsx";
import CentrePage from "./centrePage.jsx";
import TransactionsTable from "./transactiontable.jsx";
import EarnCreditsPopup from "./ClaimCredit/EarnCredit/EarnCreditsPopup.jsx";
import ValidatingPopup from "./ClaimCredit/EarnCredit/ValidatingPopup.jsx";
import ConfirmPopUp from "./ClaimCredit/EarnCredit/ConfirmPopup.jsx";

import "./Sidebar.css";
import "./RightSidebar.css";
import "./DashBoardPage.css";

const Dashboard = (e) => {
  const [showPopup, setShowPopup] = useState(false);

  const popup = (x) => {
    setShowPopup(x);
  };

  return (
    <>
      {showPopup && (
        <>
        <div className="popup-overlay" onClick={() => popup(false)}>
        </div>
          <div className="earnCreditPopup">
            {/* <EarnCreditsPopup popup={popup} /> */}
            {/* <ValidatingPopup popup={popup} /> */}
            <ConfirmPopUp popup={popup} />
            
          </div>
          </>
      )}

      <div className="dashboard-conatainer">
        <Sidebar userData={e.userData[0]} />
        <div className="centre-dashboard-div">
          <CentrePage userData={e.userData[0]} popup={popup} />
          <TransactionsTable userData={e.userData} />
        </div>
        <RightSidebar userData={e.userData[0]} />
      </div>
    </>
  );
};

export default Dashboard;
