import "./Header.css";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  return (
    <div className="first-div">
      <div className="blank-div"></div>
      <div className="actually-news">Shipping for 5$</div>
      <div className="options">
        <div className="option">
          <NavLink to="/help">Help</NavLink>
        </div>
        <div className="option">
          <NavLink to="/login">Sing in</NavLink>
        </div>
        <div className="option">
          <NavLink to="/register">Register</NavLink>
        </div>
      </div>
    </div>
  );
}
