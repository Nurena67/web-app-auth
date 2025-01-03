import React from 'react';
import { Link } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

function Home() {
  return (
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-1">Patient Management System</h1>
          <p className="subtitle is-4">
            Welcome to our web application for managing patient data efficiently and securely.
          </p>
          <div className="buttons is-centered mt-5">
            <Link to="/register" className="button is-link is-medium">Register</Link>
            <Link to="/login" className="button is-light is-medium">Sign In</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
