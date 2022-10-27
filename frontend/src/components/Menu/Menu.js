import "./Menu.css";
import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Collection from "../Collection/Collection";
import Option from "./Option/Option";
import OftenChosen from "./OftenChosen/OftenChosen";
import SummerCollection from "./SummerCollection/SummerCollection";

export default function Menu(props) {
  const logo = process.env.PUBLIC_URL + "/img/jpg/picture5.png";
  return (
    <main>
      <div className="container-baner">
        <div className="picture-text">
          The latest sudo collection
          <div className="btn-text-pic">
            <button className="btn-pic" value="See more">
              <NavLink to="/">See more</NavLink>
            </button>
          </div>
        </div>
        <div className="picture">
          <img src={logo} alt="img-clothes" />
        </div>
      </div>
      <Collection />
      <Option />
      <OftenChosen />
      <SummerCollection />
      <div className="newsletter">
        <div>You want to receive information about new products. Subscribe</div>{" "}
        <div>
          <form>
            <input
              type="text"
              placeholder="Adress email"
              name="email-newsletter"
            />
          </form>
        </div>
      </div>
      <Routes>
        <Route path="men/lifestyle" element={<div>lifestyle</div>} />
      </Routes>
    </main>
  );
}
