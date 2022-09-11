import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "../../../axios";
import useAuth from "../../../hooks/useAuth";

export default function Login(props) {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fun = (e) => {
    if (e.target.value !== "") {
      e.target.nextElementSibling.classList.add("filled");
    } else {
      e.target.nextElementSibling.classList.remove("filled");
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post("/sign-in", data);
      setAuth({
        email: res.data.user.email,
        userId: res.data.user._id,
        token: res.data.token,
      });
      navigate("/");
    } catch (e) {
      setError(e.response.data.message);
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  });

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-title">Sign In</div>
        <form className="auth-form" onSubmit={login}>
          <div className="input-container">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              id="email-input"
              onBlur={fun}
              placeholder="Adress e-mail"
            />
            <label className="label" htmlFor="email-input">
              Adress e-mail
            </label>
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              id="password-input"
              onBlur={fun}
              placeholder="Password"
            />
            <label className="label" htmlFor="password-input">
              Password
            </label>
          </div>
          {error ? <div className="auth-error">{error}</div> : null}
          <div className="help-panel">
            <div className="keepLoggedIn">
              <input
                type="checkbox"
                id="keepLoggedIn"
                className="keep-logged"
              />
              <label htmlFor="keepLoggedIn">Keep me logged in</label>
            </div>
            <div className="not-remember">
              <span>Forgot your password?</span>
            </div>
          </div>
          <div className="submit-btn">
            <button className="auth-btn" type="submit">
              Login
            </button>
          </div>
          <div className="register-acc">
            <NavLink to="/register">
              You do not have an account? Sign up
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
