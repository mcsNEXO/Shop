import React, { useState } from "react";
import "./Nav.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { navItems } from "./NavItems";
import { NavLink, useNavigate } from "react-router-dom";
import Serachbar from "../UI/Searchbar.js/Serachbar";
import Dropdown from "./Dropdown/Dropdown";
import useAuth from "../../hooks/useAuth";

export default function Nav(props) {
  const logo = process.env.PUBLIC_URL + "/img/svg/logo.svg";
  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openAccount = () => {};

  return (
    <>
      <nav className={isOpen ? "is-open nav-open" : null}>
        <div
          className="left-side-menu"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="logo" />
        </div>
        <div className="main-panel-menu">
          {navItems.map((item, index) => {
            return (
              <div
                key={item.id}
                className="option-panel"
                onPointerEnter={() => setIsOpen(true)}
                onPointerLeave={() => setIsOpen(false)}
              >
                <NavLink to={item.path}>{item.title}</NavLink>
                <Dropdown item={item.submenu} />
              </div>
            );
          })}
        </div>
        <div className="right-side-menu">
          <div className="searchbar">
            <Serachbar />
          </div>

          <div className="container-icon">
            <button className="btn-icon" onClick={openAccount}>
              <div className="i-icon">
                <i className="bi bi-person"></i>
                <div className="person-container">
                  <div className="person-option">
                    <NavLink to="profile">Profile</NavLink>
                  </div>
                  <div className="person-option">Settings</div>
                  <div className="person-option">
                    {auth ? (
                      <NavLink
                        to="/"
                        onClick={() => {
                          setAuth(false);
                        }}
                      >
                        Logout
                      </NavLink>
                    ) : (
                      <NavLink to="/login">Sign in</NavLink>
                    )}
                  </div>
                </div>
              </div>
            </button>
          </div>
          <div className="container-icon">
            <button className="btn-icon">
              <i className="bi bi-heart"></i>
            </button>
          </div>
          <button className="btn-icon">
            <i className="bi bi-bag"></i>
          </button>
        </div>
      </nav>
      <div className={`bg-page ${isOpen ? "is-open" : ""}`}></div>
    </>
  );
}
