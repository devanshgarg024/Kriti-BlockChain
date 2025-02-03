import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Verify.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Verify = (props) => {

  const navigate = useNavigate();
  const [phoneCode, setPhoneCode] = useState(["", "", "", "", "", ""]);
  const [emailCode, setEmailCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(50);
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setShowResend(true);
    }
  }, [timer]);

  const handleInputChange = (e, index, type) => {
    const value = e.target.value.slice(0, 1); // Only allow one character
    if (type === "phone") {
      const updatedCode = [...phoneCode];
      updatedCode[index] = value;
      setPhoneCode(updatedCode);
    } else {
      const updatedCode = [...emailCode];
      updatedCode[index] = value;
      setEmailCode(updatedCode);
    }

    // Automatically focus on the next input
    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handleResend = async () => {
    try {
      setTimer(50);
      setShowResend(false);
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/otp/send`, props.updatedFormData);
      console.log('OTP resent:', response.data);
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert('Failed to resend OTP. Please try again.');
    }
  };

  const handleConfirm = async () => {
    const otpmail = emailCode.join('');
    const otpsms = phoneCode.join('');
  
    try {
      // Verify OTPs
      const verifyResponse = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/otp/verify`, {
        email: props.updatedFormData.email,
        otpmail,
        otpsms,
        telephone: props.updatedFormData.telephone,
      });
      console.log('OTP verified:', verifyResponse.data);
      // Submit user data after OTP verification
      await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/user_info`, props.updatedFormData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('User data submitted successfully.');

      alert('Verification successful!');
      navigate('/');
    } catch (error) {
      console.error('Error during OTP verification or data submission:', error);
  
      // Check if the error contains a response object
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        if (errorMessage === 'user present') {
          alert('Email Already Registered. Please Login..');
           navigate('/');

        } else {
          alert('Invalid OTP');
        }
      } else {
        // Handle other types of errors (e.g., network issues)
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };
  const onBackClick=()=>{
    props.continue();
  }

  return (
    <div className="verify-container">
      <div className="verify-box">
        <div className="back-button">
          <ArrowBackIcon
            onClick={ onBackClick }
            style={{ cursor: "pointer" }}
          />
        </div>
        <h2>Verify your identity</h2>
        <p className="description">
          <span className="highlight tt">
            Two-Factor Authentication (2FA) process
          </span>
        </p>

        <p>
          Enter the confirmation code we sent to your <b>phone number</b>.
        </p>
        <div className="code-inputs">
          {phoneCode.map((char, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={char}
              placeholder="•"
              onChange={(e) => handleInputChange(e, index, "phone")}
            />
          ))}
        </div>

        <p>
          Enter the confirmation code we sent to your <b>email</b>.
        </p>
        <div className="code-inputs">
          {emailCode.map((char, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={char}
              placeholder="•"
              onChange={(e) => handleInputChange(e, index, "email")}
            />
          ))}
        </div>

        {showResend ? (
          <p className="resend-text">
            <a href="#" onClick={handleResend} className="resend-link">
              Resend the code
            </a>
          </p>
        ) : (
          <p className="resend-text">
            Resend the code in <span className="timer">{timer} sec</span>
          </p>
        )}

        <button className="confirm-button" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Verify;
