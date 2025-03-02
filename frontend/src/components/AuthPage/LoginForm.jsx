import React,{useState} from "react";
import "./LoginForm.css";
import CryptoJS from "crypto-js"; // Import the crypto-js library
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();
  
  const googleAuth = () => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    if (!apiUrl) {
      console.error("API URL is not defined!");
      return;
    }
    console.log("Redirecting to:", `${apiUrl}/auth/google/callback`);
    window.open(`${apiUrl}/auth/google/callback`, "_self"); // Perform the redirect
  };


    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

async function  handleSubmit(e){
  e.preventDefault();
    const hashedPassword = CryptoJS.SHA256(formData.password).toString(
      CryptoJS.enc.Base64
    );
    const updatedFormData = {
      ...formData,
      password: hashedPassword,
    };

    try {
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`; // Backend URL for local login
      const { data } = await axios.post(
        url,
        updatedFormData,
        { withCredentials: true }
      );
      // console.log(data);
      if (data.success) {
        navigate("/dashboard"); // Redirect to dashboard on successful login
      } 
    } catch (err) {
      console.error("Login error:", err);
    }
}
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Log in to your account</h2>
        <form  method="POST" onSubmit={handleSubmit}>
          <label className="input-field">
          <input
           className="consumer_id"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
            <input
            className="password"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          </label>
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
      </div>
      <div className="social-login">
        <button type="button" onClick={googleAuth} className="google-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
</svg>
          Continue with Google
        </button>
      </div>

      <p>
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default LoginForm;
