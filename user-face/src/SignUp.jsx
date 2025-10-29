import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  return (
    <div className="sign-up-form">
      <form>
        <h3>Create an Account</h3>
        <div className="sign-up-message">Sign up to get started!</div>
        <div className="form-group">
          <label htmlFor="username">Full Name</label>
          <input type="text" id="username" placeholder="John Doe" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="••••••••"
            required
          />
        </div>
        <button>Sign Up</button>
        <div className="sign-in-link">
          Already have an account? <Link to="/SignIn">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
