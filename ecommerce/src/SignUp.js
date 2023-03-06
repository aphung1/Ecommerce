import React, { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json " },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="SignUp">
      <h2>Sign Up</h2>
      <form className="SignUp__form" onSubmit={handleSubmit}>
        <label>
          Email Address
          <br />
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password <br />
          <input
            type="password"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Create an Account" />
      </form>
    </div>
  );
};

export default SignUp;
