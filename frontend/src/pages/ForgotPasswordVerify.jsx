import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordVerify = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);

    try {
      const response = await axios.post(
        "https://web-app-auth.up.railway.app/verify-otp",
        { email, otp, newPassword }
      );

      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/login'); 
      }, 3000);

    } catch (err) {
      setError(true);
      setMessage(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h1 className="title">Reset Password</h1>
        <form onSubmit={handleVerifyOtp}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">OTP</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">New Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="button is-primary" type="submit">
            Reset Password
          </button>
        </form>
        {message && (
          <div
            className={`notification ${error ? "is-danger" : "is-success"}`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordVerify;
