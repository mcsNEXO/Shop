import "./Profile.css";
import { NavLink } from "react-router-dom";

export default function Profile(props) {
  return (
    <div className="container-profile">
      <aside>
        <div className="profile-title">
          <i class="bi bi-person-circle"></i> Profile
        </div>
        <div className="profile-option">
          <NavLink className="black" to="my-data">
            <i className="bi bi-person-square"></i> My data
          </NavLink>
        </div>
        <div className="profile-option">
          <NavLink className="black" to="/favorite">
            <i class="bi bi-heart-fill"></i> Favorite
          </NavLink>
        </div>
        <div className="profile-option">
          <NavLink className="black" to="cart">
            <i class="bi bi-bag-fill"></i> Your cart
          </NavLink>
        </div>
        <div className="profile-option">
          <NavLink className="black" to="orders">
            <i class="bi bi-archive-fill"></i> Orders
          </NavLink>
        </div>
        <div className="profile-option">
          <NavLink className="black" to="/">
            <i class="bi bi-door-closed-fill"></i> Logout
          </NavLink>
        </div>
      </aside>
    </div>
  );
}
