import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // include cookies in the request
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage(data.message);
        setError("");
        // Clear form fields
        setEmail("");
        setPassword("");
      } else {
        if (data.errors) {
          const firstError = data.errors.email || data.errors.password;
          setError(firstError);
        } else {
          setError(data.message || "An error occurred. Please try again.");
        }
        setMessage("");
      }
      if (data.user) {
        location.assign("/");
      }
    } catch (err) {
      setError("Cannot connect to the server. Please try again later.");
      setMessage("");
    }
  };

  return (
    <div className="sign-in-form">
      <form onSubmit={handleSubmit}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Sign In</button>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <div className="sign-up-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
