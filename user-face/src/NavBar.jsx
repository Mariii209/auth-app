import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <h2>
          <i className="fa-solid fa-heart"></i> LoveConnect
        </h2>
      </Link>
      <div>
        <Link to="/login">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
}
