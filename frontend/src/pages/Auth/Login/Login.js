import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "../../../axios";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import Input from "../../../components/Input/Input";

export default function Login(props) {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cart, setCart] = useCart();

  const login = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    const localCart = cart;
    try {
      const res = await axios.post("/sign-in", data);
      setAuth(res.data.user);
      if (localCart) {
        console.log("localcart");
        const data2 = {
          cart: localCart,
          userId: res.data.user._id,
        };
        const res2 = await axios.post("/add-product", data2);
        setCart(res2.data.cart);
      }

      navigate("/");
    } catch (e) {
      setError(e.response.data.message);
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
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            class="auth"
            id="email-input"
            placeholder="Adress e-mail"
          />
          <Input
            type="password"
            name="password"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            id="password-input"
            class="auth"
            placeholder="Password"
          />
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
