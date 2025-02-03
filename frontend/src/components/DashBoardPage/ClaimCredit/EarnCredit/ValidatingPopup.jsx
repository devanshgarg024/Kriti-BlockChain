import React ,{useState,useEffect}from "react";
import "./ValidatingPopup.css";
import "./EarnCreditsPopup.css";

const ValidatingPopup = (props) => {
  const [msg,setMsg]=useState(props.msg);
  useEffect(()=>{
    setMsg(props.msg);
    console.log(props.msg);
  },[props.msg])
  return (
    // <div className="ValidatingaPage-container">
    <>
      <div className="ValidatingPage-text-parent">
        <h2 className="ValidatingPage-text">{msg}</h2>
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
