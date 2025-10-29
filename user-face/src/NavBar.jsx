import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function NavBar() {
  return (
    <nav className="navbar">
      <h2>
        <i class="fa-solid fa-heart"></i> LoveConnect
      </h2>
      <div>
        <Link to="/">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}
