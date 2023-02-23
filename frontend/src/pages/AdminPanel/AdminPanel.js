import { NavLink } from "react-router-dom";
import "./AdminPanel.scss";

export default function AdminPanel(props) {
  return (
    <div className="con-admin-panel">
      <NavLink to="add-product" className="option-add" data-name="product">
        <span>Add product</span>
      </NavLink>
      <NavLink to="delete-product" className="option-delete">
        <span>Delete product</span>
      </NavLink>
    </div>
  );
}
