import React, { useState } from "react";
import "./Nav.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { navItems } from "./NavItems";
import { navButtons } from "./NavItems";
import { NavLink } from "react-router-dom";
import Serachbar from "../UI/Searchbar.js/Serachbar";
import Dropdown from "./Dropdown/Dropdown";

export default function Nav(props) {
  const logo = process.env.PUBLIC_URL + "/img/svg/logo.svg";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className={isOpen ? "is-open nav-open" : null}>
        <div className="left-side-menu">
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
          {navButtons.map((item) => {
            return (
              <button key={item.id} className="btn-icon">
                <i className={item.cName}></i>
              </button>
            );
          })}
        </div>
      </nav>
      <div className={`bg-page ${isOpen ? "is-open" : ""}`}></div>
    </>
  );
}
