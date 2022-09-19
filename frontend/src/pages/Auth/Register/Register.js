import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../../axios";
import useAuth from "../../../hooks/useAuth";
import { validate } from "../../../components/helpers/validations";

export default function Register(props) {
  const [error, setError] = useState("");
  const [auth, setAuth] = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: {
      value: "",
      error: "",
      rules: ["email", { rule: "min", number: 6 }, "required"],
    },
    password: {
      value: "",
      error: "",
      rules: [{ rule: "min", number: 6 }, "required"],
    },
    firstname: {
      value: "",
      error: "",
      rules: ["required"],
    },
    lastname: {
      value: "",
      error: "",
      rules: ["required"],
    },
  });

  const fun = (e) => {
    if (e.target.value !== "") {
      e.target.nextElementSibling.classList.add("filled");
    } else if (e.target.value === "") {
      e.target.nextElementSibling.classList.remove("filled");
    }
  };

  const register = async (e) => {
    e.preventDefault();
    const user = {
      email: form.email.value,
      password: form.password.value,
      firstName: firstName,
      lastName: lastName,
    };
    if (form.email.error) setError(form.email.error);
    else if (form.password.error) setError(form.password.error);
    else if (form.email.value === "") setError("Email is required");
    else if (form.password.value === "") setError("Password is required");
    else {
      setError("");
    }
    try {
      await axios.post("/sign-up", user);
      navigate("/login");
    } catch (e) {
      console.log(e.response.data.message[0]);
      e.response.data.message[0].includes(":")
        ? setError(e.response.data.message[0].split(":")[2].split(",")[0])
        : setError(e.response.data.message);
    }
  };

  const changeHandler = (value, type) => {
    const { error } = validate(form[type].rules, value, type);
    setForm({
      ...form,
      [type]: {
        ...form[type],
        value,
        error: error,
      },
    });
  };
  useEffect(() => {
    if (auth) navigate("/");
  });

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-title">Register</div>
        <form className="auth-form" onSubmit={register}>
          <span className="register-title">Login data</span>
          <div className="input-container">
            <input
              type="email"
              name="email"
              onChange={(e) => changeHandler(e.target.value, "email")}
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
              onChange={(e) => changeHandler(e.target.value, "password")}
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
              // value={firstName}
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
          {error ? <div className="input-check-auth">{error}</div> : null}
          <div className="help-panel">
            <div className="terms">
              <input type="checkbox" id="terms" className="term" />
              <label htmlFor="terms">I agree to the given regulations</label>
            </div>
          </div>
          <div className="submit-btn">
            <button className="auth-btn" type="submit">
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
