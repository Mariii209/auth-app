import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <h2>
          <i class="fa-solid fa-heart"></i> LoveConnect
        </h2>
      </Link>
      <div>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}
