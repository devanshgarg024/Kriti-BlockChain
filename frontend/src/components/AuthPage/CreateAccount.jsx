import React, { useState } from "react";
import Logo from "./logo";
import Verify from "./Verify";
import AccountForm from "./AccountForm.jsx";
import "./CreateAccount.css";
import "./createpagebckgnd.css";
import "./Logo.css";

const CreateAccount = () => {
  const [showVerify, setShowVerify] = useState(false);
  const [animationClass, setAnimationClass] = useState("slide-in");

  function detailsEntered() {
    setAnimationClass("slide-out"); // Slide out the current container
    setTimeout(() => {
      setShowVerify(true);
      setAnimationClass("slide-in "); // Slide in the next container
    }, 500); // Matches the transition duration in CSS
  }

  return (
    <div className="create-account-page">
      <Logo />
      <div className={`create-account-container ${animationClass}`}>
        {!showVerify ? (
          <AccountForm continue={detailsEntered} />
        ) : (
          <Verify />
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
