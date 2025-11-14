import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password, confirmPassword }),
        credentials: "include", // include cookies in the request
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage(data.message);
        setError("");
        // Clear form fields
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        if (data.errors) {
          const firstError =
            data.errors.fullName ||
            data.errors.email ||
            data.errors.password ||
            data.errors.confirmPassword;
          setError(firstError);
        } else {
          setError(data.message || "An error occurred. Please try again.");
        }
        setMessage("");
      }

      if (data.user) {
        navigate("/home");
      }
    } catch (error) {
      setError("Cannot connect to the server. Please try again later.");
      setMessage("");
    }
  };

  return (
    <div className="sign-up-form">
      <form onSubmit={handleSignUp}>
        <h3>Create an Account</h3>
        <div className="sign-up-message">Sign up to get started!</div>

        <div className="form-group">
          <label htmlFor="username">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="John Doe"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="••••••••"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit">Sign Up</button>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <div className="sign-in-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
