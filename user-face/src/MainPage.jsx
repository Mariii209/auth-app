import React from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="main-page">
      <div className="main-text">
        <div className="badge">
          <i className="fa-solid fa-certificate"></i>
          Join our growing community of happy users.
        </div>
        <h5>Find Your Perfect Match Today!</h5>
        <p>
          Connect with people who share your interests, values, and lifestyle.
          Our smart algorithm helps you find meaningful connections.
        </p>
        <div className="action-links">
          <Link className="get-started" to="/signup">
            Get Started Free
          </Link>
          <Link className="log-in" to="/login">
            Login
          </Link>
        </div>
      </div>
      <div className="image-gallery">
        <img src="/FirstCouple.png" className="first" alt="" />
        <img src="/Friends.png" className="second" alt="" />
        <img src="/Lovers.png" className="third" alt="" />
      </div>
    </div>
  );
}
