import React from "react";

export default function SignIn() {
  return (
    <form className="sign-in-form">
      <h3> Welcome Back</h3>
      <div className="sign-in-message">Sign in to your account to continue</div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="you@example.com" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="••••••••" required />
      </div>
    </form>
  );
}
