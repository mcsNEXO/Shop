import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function Header(props) {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const login = () => {
    navigate("login");
  };
  const logout = () => {
    setAuth(false);
    navigate("/");
  };
  return (
    <div className="first-div">
      <div className="blank-div"></div>
      <div className="actually-news">Shipping for 5$</div>
      <div className="options">
        <div className="option">
          <NavLink to="/help">Help</NavLink>
        </div>
        {auth ? (
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
