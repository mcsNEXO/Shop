import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../../axios";
import useAuth from "../../../hooks/useAuth";
import { validate } from "../../../components/helpers/validations";
import Input from "../../../components/Input/Input";

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

  const register = async (e) => {
    e.preventDefault();
    const user = {
      email: form.email.value,
      password: form.password.value,
      firstName: firstName,
      lastName: lastName,
    };
    // if (form.email.error) setError(form.email.error);
    // else if (form.password.error) setError(form.password.error);
    // else if (form.email.value === "") setError("Email is required");
    // else if (form.password.value === "") setError("Password is required");
    // else {
    //   setError("");
    // }
    try {
      await axios.post("/sign-up", user);
      navigate("/login");
    } catch (e) {
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
          <Input
            type="email"
            name="email"
            onChange={(e) => changeHandler(e.target.value, "email")}
            class="auth"
            id="email-input"
            placeholder="Adress e-mail"
          />
          <Input
            type="password"
            name="password"
            onChange={(e) => changeHandler(e.target.value, "password")}
            class="auth"
            id="password-input"
            placeholder="Password"
          />
          <span className="register-title">Personal data</span>
          <Input
            type="firstName"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName-input"
            placeholder="First name"
            class="auth"
          />
          <Input
            type="lastName"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
            class="auth"
            id="lastName-input"
            placeholder="LastName"
          />
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
