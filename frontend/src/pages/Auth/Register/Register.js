import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../axios";
import { validate } from "../../../components/helpers/validations";

export default function Register(props) {
  const [error, setError] = useState("");
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
    if (form.email.error || form.password.error) {
      if (form.email.error) {
        setError(form.email.error);
        if ((form.email.error = "")) {
          console.log("s");
        }
      } else if (form.password.error) {
        setError(form.password.error);
      }
    } else {
      setError("");
    }
    try {
      const res = await axios.post("/sign-up", user);
      console.log(res);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (value, type) => {
    const { error } = validate(form[type].rules, value, type);
    console.log(error);
    setForm({
      ...form,
      [type]: {
        ...form[type],
        value,
        error: error,
      },
    });
    console.log(form.email.error);
  };

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
              // value={form.email.value}
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
              // value={form.password.value}
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
          {error ? <div className="input-check-auth">{error}</div> : null}

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
