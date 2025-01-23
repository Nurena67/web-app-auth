import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/AuthSlice.js";
import { useNavigate, Link} from "react-router-dom";

import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const Auth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://web-app-auth.up.railway.app/login', {
        email, 
        password ,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      dispatch(setCredentials({ user, token }));
      
      navigate("/dashboard")
    } catch (error) {
      console.error("Login failed:", error.response.data.msg);
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
                  {/* {msg && 
                  <p className="has-text-centered has-text-danger">{msg}</p>} */}

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
                  Login
                  </button>
                </div>

                <div className="has-text-centered">
                    <p>
                      Belum punya akun?{" "}
                      <Link to="/register" className="has-text-primary">
                        Daftar di sini
                      </Link>
                    </p>
                    <p>
                      Lupa password?{" "}
                      <Link to="/forgot-password" className="has-text-primary">
                        Reset password
                      </Link>
                    </p>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  )
};

export default Login;
