import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../axios";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const fun = (e) => {
    if (e.target.value !== "") {
      e.target.nextElementSibling.classList.add("filled");
    } else if (e.target.value === "") {
      e.target.nextElementSibling.classList.remove("filled");
    }
  };

  const register = async (e) => {
    const user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    try {
      const res = await axios.post("/sign-up", user);
      console.log(res);
      setAuth({
        email: res.data.user.email,
        token: res.data.user._id,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const test = () => {
    console.log(auth);
  };

  const submit = (e) => {
    e.preventDefault();
    register();
    // navigate("/login");
  };

  return (
    <div className="auth-container">
      <button onClick={test}></button>
      <div className="auth-box">
        <div className="auth-title">Register</div>
        <form className="auth-form" method="post">
          <span className="register-title">Login data</span>
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
          <span className="register-title">Personal data</span>
          <div className="input-container">
            <input
              type="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="auth-input"
              id="firstName-input"
              onBlur={fun}
              placeholder="First name"
            />
            <label className="label" htmlFor="firstName-input">
              First Name
            </label>
          </div>
          <div className="input-container">
            <input
              type="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="auth-input"
              id="lastName-input"
              onBlur={fun}
              placeholder="LastName"
            />
            <label className="label" htmlFor="lastName-input">
              Last name
            </label>
          </div>
          <div className="help-panel">
            <div className="terms">
              <input type="checkbox" id="terms" className="term" />
              <label htmlFor="terms">I agree to the given regulations</label>
            </div>
          </div>
          <div className="submit-btn">
            <button className="auth-btn" onClick={submit}>
              Register
            </button>
          </div>
          <div className="register-acc">
            <NavLink to="/login">Have you got an account? Sign in</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
