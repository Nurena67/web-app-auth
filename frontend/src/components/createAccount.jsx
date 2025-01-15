import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!name) {
      setErrorMessage("Nama tidak boleh kosong");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Format email tidak valid");
      return;
    }

    if (!password) {
      setErrorMessage("Password tidak boleh kosong");
      return;
    }

    try {
      const response = await axios.post('https://web-app-auth.up.railway.app/register', {
        name,
        email,
        password,
      });
      
      if (response.data.message) {
        setSuccessMessage(response.data.message); // Menampilkan pesan sukses
        setTimeout(() => {
          navigate('/login'); // Redirect ke halaman login setelah beberapa detik
        }, 2000);
      }

    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.msg || "Terjadi kesalahan, coba lagi.");
      }
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
                <form onSubmit={handleCreateAccount} className="box">
                  {errorMessage && 
                    <p className="has-text-centered has-text-danger">{errorMessage}</p>
                  }
                  {successMessage && 
                    <p className="has-text-centered has-text-success">{successMessage}</p>
                  }
                  <h1 className="title has-text-centered">Create Account</h1>
                  <div className="field">
                    <label className="label">Nama</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                      <input
                        type="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email"
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
                      {isLoading ? "Loading..." : "Create Account"}
                    </button>
                  </div>

                  <p className="has-text-centered">
                    Sudah punya akun? <a href="/login">Login di sini</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateAccount;
