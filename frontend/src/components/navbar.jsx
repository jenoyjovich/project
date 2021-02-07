import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark shadow">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Recipe <i className="fas fa-mortar-pestle"></i> Share
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/my-recipes">
                    My Recipes
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className="navbar-nav ml-auto">
              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/my-favorites">
                    <i className="fas fa-star"></i> Favorites
                  </NavLink>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    <i className="fas fa-sign-out-alt"></i> Log out
                  </NavLink>
                </li>
              )}
              {!user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signin">
                    <i className="fas fa-sign-in-alt"></i> Sign In
                  </NavLink>
                </li>
              )}
              {!user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    <i className="fas fa-user-plus"></i> Sign Up
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
