import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/authContext";
import { useContext } from "react";

export default function Header(props) {
  const user = useContext(AuthContext);
  const history = useNavigate();
  const login = (e) => {
    e.preventDefault();
    history("login");
  };
  const logout = (e) => {
    e.preventDefault();
    user.logout();
    history("/");
  };
  return (
    <div className="first-div">
      <div className="blank-div"></div>
      <div className="actually-news">Shipping for 5$</div>
      <div className="options">
        <div className="option">
          <NavLink to="/help">Help</NavLink>
        </div>
        {user.isAuthentiacted ? (
          <div className="option">
            <NavLink to="/" onClick={logout}>
              Log out
            </NavLink>
          </div>
        ) : (
          <>
            <div className="option">
              <NavLink to="/login" onClick={login}>
                Sign in
              </NavLink>
            </div>
            <div className="option">
              <NavLink to="/register">Register</NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
