import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function NavBar() {
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

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
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </nav>
  );
}
