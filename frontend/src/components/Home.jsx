// import React from 'react';
// import { Link } from 'react-router-dom';
// import 'bulma/css/bulma.min.css';

// function Home() {

//   const token = localStorage.getItem('token');

//   return (
//     <section className="hero is-primary is-fullheight">
//       <div className="hero-body">
//         <div className="container has-text-centered">
//           <h1 className="title is-1">Patient Management System</h1>
//           <p className="subtitle is-4">
//             Welcome to our web application for managing patient data efficiently and securely.
//           </p>

//           <div className="buttons is-centered mt-5">

//           {token ? (
//               <Link to="/dashboard" className="button is-link is-medium">
//                 Dashboard
//               </Link>

//             ) : (

//               <>
//                 <Link to="/register" className="button is-link is-medium">Register</Link>
//                 <Link to="/login" className="button is-light is-medium">Sign In</Link>
//               </>

//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Home;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkLogin } from '../features/authSlice.js'; // Pastikan import checkLogin yang sudah kita buat

function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth); // Ambil status isAuthenticated dari Redux

  useEffect(() => {
    // Cek login saat halaman pertama kali dimuat
    dispatch(checkLogin());
  }, [dispatch]);

  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-1">Patient Management System</h1>
          <p className="subtitle is-4">
            Welcome to our web application for managing patient data efficiently and securely.
          </p>

          <div className="buttons is-centered mt-5">
            {isAuthenticated ? (
              <Link to="/dashboard" className="button is-link is-medium">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="button is-link is-medium">
                  Register
                </Link>
                <Link to="/login" className="button is-light is-medium">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
