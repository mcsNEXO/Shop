import "./Profile.css";
import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import MyData from "../Profile/MyData/MyData";
import ProfilePage from "./ProfilePage/ProfilePage";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

export default function Profile(props) {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const logoutUser = () => {
    setAuth("");
    setCart("");
  };

  return (
    <div className="container-profile">
      <aside>
        <div className="profile-position">
          <div className="profile-title">
            <NavLink className="black" to="/profile">
              <i className="bi bi-person-circle"></i> Profile
            </NavLink>
          </div>
          <div className="profile-option">
            <NavLink className="black" to="my-data">
              <i className="bi bi-person"></i>
              My data
            </NavLink>
          </div>
          {auth.admin === true ? (
            <div className="profile-option">
              <NavLink className="black" to="/admin-panel">
                <i className="bi bi-hdd-stack"></i> Admin panel
              </NavLink>
            </div>
          ) : null}
          <div className="profile-option">
            <NavLink className="black" to="/cart">
              <i className="bi bi-bag"></i> Your cart
            </NavLink>
          </div>
          <div className="profile-option">
            <NavLink className="black" to="/favorite">
              <i className="bi bi-heart"></i> Favorite
            </NavLink>
          </div>
          <div className="profile-option">
            <NavLink className="black" to="orders">
              <i className="bi bi-bag-check"></i> Orders
            </NavLink>
          </div>
          <div className="profile-option">
            <NavLink className="black" to="/" onClick={logoutUser}>
              <i className="bi bi-door-closed"></i> Logout
            </NavLink>
          </div>
        </div>
      </aside>
      <Routes>
        <Route path="" element={<ProfilePage />} />
        <Route path="my-data" element={<MyData />} />
      </Routes>
    </div>
  );
}
