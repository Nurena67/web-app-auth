import React, { useState } from "react";
import axios from "axios";

const ForgotPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(false);

    try {
      const response = await axios.post(
        "https://web-app-auth.up.railway.app/forgot-password",
        { email }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(true);
      setMessage(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h1 className="title">Forgot Password</h1>
        <form onSubmit={handleRequestOtp}>
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
          <button className="button is-primary" type="submit">
            Request OTP
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

export default ForgotPasswordRequest;
