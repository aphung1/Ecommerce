import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    try {
      const res = await fetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json " },
      });
      const data = await res.json();
      if (data.error) {
        setEmailError(data.error.email);
        setPasswordError(data.error.password);
      }
      if (data.id) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="SignUp">
      <form className="SignUp__form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label>
          Email Address: &nbsp;
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        {emailError && (
          <React.Fragment>
            <p className="SignUp__form__error">{emailError}</p>
            <br />
          </React.Fragment>
        )}
        <label>
          Password: &nbsp;
          <input
            type="password"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        {passwordError && (
          <React.Fragment>
            <p className="SignUp__form__error">{passwordError}</p>
            <br />
          </React.Fragment>
        )}
        <input type="submit" value="Create an Account" />
        <br />
        Already have an account? <Link to="/login">Log In</Link>
      </form>
    </div>
  );
};

export default SignUp;
