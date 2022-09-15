import "./Profile.css";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import MyData from "../Profile/MyData/MyData";

export default function Profile(props) {
  return (
    <div className="container-profile">
      <aside>
        <div className="profile-title">
          <i className="bi bi-person-circle"></i> Profile
        </div>
        <div className="profile-option">
          <NavLink className="black" to="my-data">
            <i className="bi bi-person"></i>
            My data
          </NavLink>
        </div>
        <div className="profile-option">
          <NavLink className="black" to="cart">
            <i className="bi bi-bag"></i> Your cart
          </NavLink>
        </div>
        <div className="profile-option">
          <NavLink className="black" to="favorite">
            <i className="bi bi-heart"></i> Favorite
          </NavLink>
        </div>
        <div className="profile-option">
          <NavLink className="black" to="orders">
            <i className="bi bi-bag-check"></i> Orders
          </NavLink>
        </div>
        <div className="profile-option">
          <NavLink className="black" to="/">
            <i className="bi bi-door-closed"></i> Logout
          </NavLink>
        </div>
      </aside>
      <Routes>
        <Route path="my-data" element={<MyData />} />
        <Route path="my-data" element={<MyData />} />
      </Routes>
    </div>
  );
}
