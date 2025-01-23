import "./RightSideBar.css";
import NetMeteringCard from "./NetMeteringCard";
import CarbonCreditCard from "./CarbonCreditCard";

const RightSidebar = () => {
    return (
        <div className="rightsidebar">
            <div className="welcome-section">
                <p>Hello <b>Shruti</b></p>
                <div className="connect-btn">
                    <button className="metamask-button">
                        🦁Connect to Metamask
                    </button>
                </div>
            </div>

            <div className="card1">
                <NetMeteringCard></NetMeteringCard>
            </div>

            <div className="card2">
                <CarbonCreditCard></CarbonCreditCard>
            </div>
        </div>
    );
};

export default RightSidebar;