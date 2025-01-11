import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="hero is-fullheight is-danger">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-size-1 has-text-white">404</h1>
          <h2 className="subtitle is-size-4 has-text-white">
            Oops! The page you're looking for doesn't exist.
          </h2>
          <p className="mb-4 has-text-white">
            It seems you've hit a broken link or entered an incorrect URL.
          </p>
          <Link to="/" className="button is-danger is-light is-medium">
            <span className="icon">
              <i className="fas fa-home"></i>
            </span>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
