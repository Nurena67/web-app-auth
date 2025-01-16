import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {      
      try {
        const response = await axios.get(
          `https://web-app-auth.up.railway.app/verify-email/${token}`
          );
        if (response.status === 200) {
          setMessage('Email successfully verified! You can now log in.');
        } else {
          setError(true);
          setMessage('Verification failed.');
        }
      } catch (error) {
        setError(true);
        setMessage('An error occurred during verification. Please try again.');
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  const goLogin = () => {
    navigate('/login')
  };

  return (
    <div className="container">
      <div className="notification is-primary">
        <h1 className="title">{error ? "Verification Failed" : "Verification Successful"}</h1>
        <p>{message}</p>
      </div>
      <button onClick={goLogin} className="button is-link is-medium">
                Back to Login Page
      </button>
    </div>
  );
};

export default VerifyEmail;
