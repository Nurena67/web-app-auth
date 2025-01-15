import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = new URLSearchParams(location.search).get('token');
      try {
        const response = await axios.get(`https://your-backend-url.up.railway.app/verify-email?token=${token}`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response.data.message);
      }
    };

    verifyToken();
  }, [location]);

  const goHome = () => {
    navigate('/')
  };

  return (
    <div className="container">
      <h1>Email Verification</h1>
      <p>{message}</p>
      <button onClick={goHome} className="button is-link is-medium">
                Back to Home
        </button>
    </div>
  );
};

export default VerifyEmail;
