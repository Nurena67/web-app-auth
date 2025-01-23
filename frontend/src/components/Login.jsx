// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link} from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();


//   const Auth = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://web-app-auth.up.railway.app/login', {
//         email, 
//         password ,
//       });
      
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//       }
      
//       navigate('/dashboard')
//     } catch (error) {
//       if (error.response) {
//         setMsg(error.response.data.msg || "Email atau Password salah!");
//       };
//     }
//   };
  
//   return (
//     <div>
//       <section className="hero is-fullheight is-fullwidth is-light">
//         <div className="hero-body">
//           <div className="container">
//             <div className="columns is-centered is-vcentered">
//               <div className="column is-5-tablet is-4-desktop">
//                 <form onSubmit={Auth} className="box">
//                   {msg && 
//                   <p className="has-text-centered has-text-danger">{msg}</p>}

//                 <h1 className="title has-text-centered">Sign In</h1>
//                 <div className="field">
//                   <label className="label">Email</label>
//                   <div className="control has-icons-left">
//                     <input
//                       type="email"
//                       className="input"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="Enter your email"
//                       required
//                     />
//                     <span className="icon is-small is-left">
//                       <i className="fas fa-envelope"></i>
//                     </span>
//                   </div>
//                 </div>

//                 <div className="field">
//                   <label className="label">Password</label>
//                   <div className="control has-icons-left">
//                     <input
//                       type="password"
//                       className="input"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="********"
//                       required
//                     />
//                     <span className="icon is-small is-left">
//                       <i className="fas fa-lock"></i>
//                     </span>
//                   </div>
//                 </div>

//                 <div className="field">
//                   <button className="button is-primary is-fullwidth" disabled={isLoading}>
//                   {isLoading ? "Loading..." : "Login"}
//                   </button>
//                 </div>

//                 <div className="has-text-centered">
//                     <p>
//                       Belum punya akun?{" "}
//                       <Link to="/register" className="has-text-primary">
//                         Daftar di sini
//                       </Link>
//                     </p>
//                     <p>
//                       Lupa password?{" "}
//                       <Link to="/forgot-password" className="has-text-primary">
//                         Reset password
//                       </Link>
//                     </p>
//                   </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   </div>
//   )
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://web-app-auth.up.railway.app/login', {
        email,
        password,
      });

      const { token } = response.data;
      login(token);
      alert('Login berhasil');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Terjadi kesalahan, silakan coba lagi.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="title is-4">Login</h2>
      <form onSubmit={handleLogin}>
        {error && <div className="notification is-danger">{error}</div>}
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button type="submit" className="button is-primary">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

