import React ,{ useEffect, useState }from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bulma/css/bulma.min.css';

function Home() {
  const {user} = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Gunakan useEffect untuk memantau perubahan state user
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);
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
                <Link to="/register" className="button is-link is-medium">Register</Link>
                <Link to="/login" className="button is-light is-medium">Sign In</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
