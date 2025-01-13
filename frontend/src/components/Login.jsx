import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const Auth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!isValidEmail(email)) {
      setErrorMessage("Format email tidak valid");
      return;
    }

    if (!password) {
      setErrorMessage("Password tidak boleh kosong");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://web-app-auth.up.railway.app/login', {
         email, 
         password ,
      });

      localStorage.setItem('token', response.data.token);
      
      navigate('/dashboard')
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.msg || "Email atau Password salah!");
      };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="hero is-fullheight is-fullwidth is-light">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered is-vcentered">
              <div className="column is-5-tablet is-4-desktop">
                <form onSubmit={Auth} className="box">
                  {errorMessage && 
                  <p className="has-text-centered has-text-danger">{errorMessage}</p>}
                <h1 className="title has-text-centered">Sign In</h1>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left">
                    <input
                      type="email"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <button className="button is-primary is-fullwidth">
                  {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Login