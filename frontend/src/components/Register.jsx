import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
    role: "nurse", 
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(formData.email)) {
      setError("Format email tidak valid.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password harus minimal 6 karakter.");
      return;
    }

    if (formData.password !== formData.confPassword) {
      setError("Password and confirm password must match.");
      return;
    }

    setIsLoading(true);

    try{
        await axios.post("https://web-app-auth.up.railway.app/register", formData);
        setFormData({
            name: "",
            email: "",
            password: "",
            confPassword: "",
            role: "nurse", 
        });
        alert('Akun Berhasil di buat!');

        navigate("/login")
    } catch (error) {

        if (error.response) {
        setError(error.response.data.msg || "Terjadi kesalahan. Silakan coba lagi.");

      } else {
      setError("Terjadi kesalahan server. Silakan coba lagi nanti.");
      }

    } finally{
      setIsLoading(false);
  };
};

  return (
    <div className="container">
      <h1 className="title">Register</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="notification is-danger">{error}</div>}
        
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name="confPassword"
              value={formData.confPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button 
            className={`button is-primary ${isLoading ? 'is-loading' : ''}`} 
            type="submit" 
            disabled={isLoading}
            >
              Register
            </button>
            
          </div>
          <div className="control">
            <button 
            className='button is-light'
            type="button" 
            onClick={() => navigate('/')}
            >
              Kembali
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
