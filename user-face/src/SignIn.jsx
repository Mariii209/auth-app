import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful sign-in (e.g., redirect, show message)
      } else {
        setError(data.message || "Sign-in failed. Please try again.");
      }
    } catch (err) {
      setError("Sign-in failed. Please try again.");
    }
  };

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
        <button>Sign In</button>
        <div className="sign-up-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
