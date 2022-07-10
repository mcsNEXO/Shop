import React from "react"
import './Nav.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { navItems } from "./NavItems";
import { navButtons } from "./NavItems";
import {NavLink} from 'react-router-dom'
import Serachbar from "../UI/Searchbar.js/Serachbar";

export default function Nav(props) {
    const logo = process.env.PUBLIC_URL + '/img/svg/logo.svg'
    return(
        <nav>
            <div className="left-side-menu">  <img src={logo} alt='logo'/></div>
            <div className="main-panel-menu">
                {navItems.map((item)=>{
                    return(
                        <div key={item.id} className="option-panel">
                            <NavLink to={item.path}>{item.title}</NavLink>
                        </div>
                    )
                })}
            </div>
            <div className="right-side-menu">
                <div className="searchbar"><Serachbar/></div>
                {navButtons.map(item=>{
                    return(
                        <button key={item.id} className="btn-icon"><i className={item.cName}></i></button>
                    )
                })}
            </div>
        </nav>
    )
};