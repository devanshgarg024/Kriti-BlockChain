import React from "react";
import "./ValidatingPopup.css";
import "./EarnCreditsPopup.css";

const ValidatingPopup = (props) => {
  
  return (
    // <div className="ValidatingaPage-container">
    <>
    <button className="popup-close" onClick={()=>props.popup(false)}>
          &times;
        </button>
      <div className="ValidatingPage-text-parent">
        <h2 className="ValidatingPage-text">Validating...</h2>
        <p className="sub-text">Waiting for smart meter data to get logged</p>
      </div>
      <div className="ValidatingPage-spinner"></div>
      <div className="Loading-container">
        <button className="ValidatingPage-button">
          Loading...
          <span className="button-spinner confirm-button"></span>
        </button>
      </div>
    </>
    // </div>
  );
};

export default ValidatingPopup;
