import React from "react"
import './Nav.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {NavLink} from 'react-router-dom'
import Serachbar from "../UI/Searchbar.js/Serachbar";

export default function Nav(props) {
    const logo = process.env.PUBLIC_URL + '/img/svg/logo.svg'
    return(
        <nav>
            <div className="left-side-menu">  <img src={logo} alt='logo'/></div>
            <div className="main-panel-menu">
                <div className="option-panel"><NavLink  to='news'>News</NavLink></div>
                <div className="option-panel"><NavLink to='men'>Men</NavLink></div>
                <div className="option-panel"><NavLink to='women'>Women</NavLink></div>
                <div className="option-panel"><NavLink to='children'>Children</NavLink></div>
                <div className="option-panel"><NavLink to='collections'>Collections</NavLink></div>
                <div className="option-panel"><NavLink to='sport'>Sport</NavLink></div>
            </div>
            <div className="right-side-menu">
                <div className="searchbar"><Serachbar/></div>
                <button className="btn-icon"><i className="bi bi-person"></i></button>
                <button className="btn-icon"><i className="bi bi-heart"></i></button>
                <button className="btn-icon"><i className="bi bi-bag"></i></button>
            </div>
        </nav>
    )
};