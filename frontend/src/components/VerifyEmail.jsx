import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {      
      try {
        const response = await axios.get('https://web-app-auth.up.railway.app/verify-email',{token});
        if (response.data.success) {
          setMessage('Email successfully verified! You can now log in.');
        } else {
          setMessage(response.data.message || 'Verification failed.');
        }
      } catch (error) {
        setMessage('An error occurred during verification. Please try again.');
      }
    };

    if (token) {
      verifyToken();
    } else {
      setMessage('Invalid verification link.');
    }

  }, [token]);

  const goLogin = () => {
    navigate('/login')
  };

  return (
    <div className="container">
      <h1>Email Verification</h1>
      <p>{message}</p>
      <button onClick={goLogin} className="button is-link is-medium">
                Back to Login Page
        </button>
    </div>
  );
};

export default VerifyEmail;
