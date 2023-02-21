import { NavLink } from "react-router-dom";
import "./AdminPanel.scss";

export default function AdminPanel(props) {
  return (
    <div className="con-admin-panel">
      <NavLink to="add-product" className="option-p" data-name="product">
        <span>Add product</span>
      </NavLink>
      <div className="option-p"></div>
    </div>
  );
}
