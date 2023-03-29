import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { useStateValue } from "./context/StateProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    try {
      const res = await fetch("/auth/login", {
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
        dispatch({
          type: "CHANGE_USER",
          id: data.id
        });
        navigate(location.state?.from?.pathname || "/", {replace: true})
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Login">
      <form className="Login__form" onSubmit={handleSubmit}>
        <h2>Log In</h2>
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
            <p className="Login__form__error">{emailError}</p>
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
            <p className="Login__form__error">{passwordError}</p>
            <br />
          </React.Fragment>
        )}
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};

export default Login;
