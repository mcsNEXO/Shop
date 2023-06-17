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
  const [prevPath, setPrevPath] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const navigate = useNavigate();
  const [cart] = useCart();
  const hamburger = useRef();
  const mainNav = useRef();
  const defaultMenu = useRef();
  const bgPage = useRef();
  const [amount, setAmount] = useState();

  let resizeWindow = () => {
    window.innerWidth >= 1000 && setIsOpen(false);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

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
  }, [JSON.stringify(cart), auth]);

  const handleHamburger = () => {
    hamburger.current.classList.toggle("open");
    hamburger.current.classList.value.includes("open")
      ? setIsOpen(true)
      : setIsOpen(false);
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
  const closeHamburger = () => {
    hamburger.current.classList.value.includes("open") && handleHamburger();

    setIsOpen(false);
  };

  const optionHandle = (path, type, secondPath) => {
    if (type === "first") {
      defaultMenu.current.style.transform = "translate(100%)";
      const kolMenu = document?.querySelector(`.kol-menu.${path}`);
      kolMenu.style.transform = "translate(0)";
      setCurrentPath(kolMenu);
      setPrevPath(defaultMenu.current);
    } else if ((type = "second")) {
      const nextMenu = document?.querySelector(
        `.kol-menu.${path} .next-menu.${secondPath}`
      );
      const currentMenu = document?.querySelector(
        `.kol-menu.${path} .current-menu`
      );
      nextMenu.style.transform = "translate(0)";
      currentMenu.style.transform = "translate(100%)";
      setCurrentPath(nextMenu);
      setPrevPath(currentMenu);
    }
  };

  const backHandle = () => {
    if (currentPath === prevPath) {
      currentPath.parentNode.style.transform = "translate(-100%)";
      defaultMenu.current.style.transform = "translate(0)";
      setCurrentPath(defaultMenu.current);
      setPrevPath("");
    } else {
      currentPath === ""
        ? (defaultMenu.current.style.transform = "translate(0)")
        : (currentPath.style.transform = "translate(-100%)");
      currentPath === ""
        ? (prevPath.style.transform = "translate(-100%)")
        : (prevPath.style.transform = "translate(0)");
      if (currentPath === "") {
        setPrevPath("");
      }
      setCurrentPath(prevPath);
    }
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
                  <div className="person-option">
                    <NavLink to="settings">Settings</NavLink>
                  </div>
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
      <nav className={`hamburger`} ref={hamburger}>
        <div className="close-icon" onClick={handleHamburger}>
          <i className="bi bi-x-circle"></i>
        </div>
        <div className="logo">
          <img src={process.env.PUBLIC_URL + "/img/svg/logo.svg"} alt="logo" />
        </div>
        <div className="line-list"></div>
        <div className="box">
          {prevPath && currentPath !== defaultMenu.current ? (
            <button className="back-btn" onClick={(e) => backHandle()}>
              <i className="bi bi-arrow-left-square-fill"></i> Back
            </button>
          ) : null}
          <div className="default-menu" ref={defaultMenu}>
            {navItems.map((item) => {
              return (
                <div key={item.id} className={`choice-panel`}>
                  <button
                    onClick={(e) => optionHandle(item.path, "first")}
                    data-name={`btn ${item.path}`}
                  >
                    <div>{item.title}</div>
                    <div className="arrow">{`>`}</div>
                  </button>
                </div>
              );
            })}
          </div>

          {navItems.map((item) => {
            return (
              <div className={`kol-menu ${item.path}`} key={item.id.toString()}>
                <div className="current-menu">
                  <div className="title-item">{item.title}</div>
                  {item.submenu.map((subItem, index) => {
                    return (
                      <div className={`choice-panel`} key={index.toString()}>
                        <button
                          onClick={(e) =>
                            optionHandle(
                              item.path,
                              "second",
                              subItem.title.toLowerCase()
                            )
                          }
                          data-name={`btn ${subItem.title.toLowerCase()}`}
                        >
                          <div>{subItem.title}</div>
                          <div className="arrow">{`>`}</div>
                        </button>
                      </div>
                    );
                  })}
                </div>
                {item.submenu.map((el, index) => (
                  <div
                    className={`next-menu ${el.title.toLowerCase()}`}
                    key={index.toString()}
                  >
                    <div className="title-item">{el.title}</div>
                    {el.submenuOption.map((element, index) => {
                      return (
                        <NavLink
                          to={`${
                            item.path
                          }/${el.title.toLowerCase()}/${element.title.toLowerCase()}`}
                          key={index.toString()}
                          onClick={handleHamburger}
                        >
                          <button className="choice-panel">
                            <div>{element.title}</div>
                          </button>
                        </NavLink>
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </nav>
      <div
        className={`bg-page ${isOpen ? "is-open" : ""}`}
        ref={bgPage}
        onClick={() => closeHamburger()}
      ></div>
    </>
  );
}
