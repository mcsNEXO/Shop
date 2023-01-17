import React, { useEffect, useRef, useState } from "react";
import "./Nav.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { navItems } from "./NavItems";
import { NavLink, useNavigate } from "react-router-dom";
import Serachbar from "../UI/Searchbar.js/Serachbar";
import Dropdown from "./Dropdown/Dropdown";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

export default function Nav(props) {
  const logo = process.env.PUBLIC_URL + "/img/svg/logo.svg";
  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [cart] = useCart();
  const hamburger = useRef();
  const mainNav = useRef();
  const bgPage = useRef();
  const [amount, setAmount] = useState();

  useEffect(() => {
    let amountItems = 0;
    if (true) {
      for (let i = 0; i < cart?.length; i++) {
        amountItems += cart[i].quantity;
      }
      setAmount(amountItems);
    } else {
      setAmount();
    }
  }, [JSON.stringify(cart)]);

  const handleHamburger = () => {
    hamburger.current.classList.toggle("open");
    setIsOpen((prev) => !prev);
  };

  const closeDdMenu = () => {
    mainNav.current.classList.remove("nav-open");
    mainNav.current.classList.remove("is-open");
    document
      .querySelectorAll(".option-panel")
      .forEach((item) => item.classList.remove("open"));
    setIsOpen(false);
  };
  const handleDropDown = (e) => {
    mainNav.current.classList.add("is-open");
    mainNav.current.classList.add("nav-open");
    setIsOpen(true);
    e.target.classList.add("open");
  };
  return (
    <>
      <nav className={`main`} ref={mainNav}>
        <div
          className="left-side-menu"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="logo" />
        </div>
        <div className="main-panel-menu">
          <div className="icon-hamburger">
            <i className="bi bi-list" onClick={handleHamburger}></i>
          </div>
          {navItems.map((item) => {
            return (
              <div
                key={item.id}
                className={`option-panel`}
                data-name={item.path}
                onPointerEnter={(e) => handleDropDown(e)}
                onPointerLeave={closeDdMenu}
              >
                <NavLink to={item.path} onClick={closeDdMenu}>
                  {item.title}
                </NavLink>
                <Dropdown
                  path={item.path}
                  item={item.submenu}
                  closeMenu={closeDdMenu}
                />
              </div>
            );
          })}
        </div>
        <div className="right-side-menu">
          <div className="searchbar">
            <Serachbar setIsOpen={setIsOpen} isOpen={isOpen} />
          </div>

          <div className="container-icon">
            <button className="btn-icon">
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
          <NavLink to="favorite" className="container-icon">
            <button className="btn-icon">
              <i className="bi bi-heart"></i>
            </button>
          </NavLink>
          <NavLink to="/cart" className="container-icon">
            <button className="btn-icon">
              <i className="bi bi-bag">
                {amount > 0 ? (
                  <span className="amount">{amount > 9 ? "9+" : amount}</span>
                ) : null}
              </i>
            </button>
          </NavLink>
        </div>
      </nav>
      <nav className={`hamburger close`} ref={hamburger}>
        <div className="close-icon" onClick={handleHamburger}>
          <i className="bi bi-x-circle"></i>
        </div>
        <div className="logo">
          <img src={process.env.PUBLIC_URL + "/img/svg/logo.svg"} alt="logo" />
        </div>
        <div className="line-list"></div>
      </nav>
      <div
        className={`bg-page ${isOpen ? "is-open" : ""}`}
        ref={bgPage}
        onClick={() => setIsOpen(false)}
      ></div>
    </>
  );
}
