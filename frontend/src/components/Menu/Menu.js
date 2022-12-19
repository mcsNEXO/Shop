import "./Menu.css";
import React from "react";
import { NavLink } from "react-router-dom";
import Collection from "./Collection/Collection";
import Option from "./Option/Option";
import OftenChosen from "./OftenChosen/OftenChosen";
import SummerCollection from "./SummerCollection/SummerCollection";

export default function Menu(props) {
  const picture = process.env.PUBLIC_URL + "/img/jpg/picture5.png";
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
          <img src={picture} alt="img-clothes" />
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
    </main>
  );
}
