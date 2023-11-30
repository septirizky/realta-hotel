import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const BookingLayout = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/#">
            Logo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/hr" className="nav-link">
                  HR
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <button className="btn btn-primary" type="button">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <Outlet />
      </div>
    </div>
  );
};

export default BookingLayout;
