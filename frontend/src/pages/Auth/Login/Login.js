import React, { useState } from "react";
import "./Login.css";

export default function Login(props) {
  const fun = (e) => {
    if (e.target.value !== "") {
      e.target.nextElementSibling.classList.add("filled");
    } else {
      e.target.nextElementSibling.classList.remove("filled");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-title">Login</div>
        <form className="login-form">
          <div className="input-container">
            <input
              type="email"
              className="login-input"
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
              className="login-input"
              id="password-input"
              onBlur={fun}
              placeholder="Password"
            />
            <label className="label" htmlFor="password-input">
              Password
            </label>
          </div>
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
            <button className="login-btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
