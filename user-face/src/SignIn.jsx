import React from "react";
import "./SignIn.css";

export default function SignIn() {
  return (
    <div className="sign-in-form">
      <form>
        <h3> Welcome Back</h3>
        <div className="sign-in-message">
          Sign in to your account to continue
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
      </form>
    </div>
  );
}
