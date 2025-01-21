import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setErrorMessage(message);
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const Auth = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage("Format email tidak valid");
      return;
    }

    dispatch(login({ email, password }));
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
                  <button className="button is-primary is-fullwidth" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Login"}
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
}

export default Login;


