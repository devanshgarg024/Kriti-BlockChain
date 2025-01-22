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
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setShowResend(true);
    }
  }, [timer]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    password: "",
    country: "",
    telephone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/userData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Fetched userData:", data); // Process the data received
        setFormData(data);
      } catch (error) {
        console.error("Error fetching userData:", error);
      }
    };

    fetchData();
  }, []);

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

  const [otp, setotp] = useState("");

  const handleResend = () => {
    setTimer(50);
    setShowResend(false);
    axios
      .post("http://localhost:8080/otp/send", formData)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };

  const handleConfirm = async () => {
    console.log("Phone Code:", phoneCode.join(""));
    console.log("Email Code:", emailCode.join(""));
    const otpmail = emailCode.join("");
    const otpsms = phoneCode.join("");
    axios
      .post("http://localhost:8080/otp/verify", {
        email: formData.email,
        otpmail: otpmail,
        otpsms: otpsms,
        telephone: formData.telephone,
      })
      .then((response) => navigate("/"))
      .catch((error) => {
        console.error(error);
        alert("Invalid OTP");
      });
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
          <span className="highlight">
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

