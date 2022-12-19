import "./Dropdown.css";
import { NavLink } from "react-router-dom";
export default function Dropdown(props) {
  let title;
  return (
    <div className="dropdown">
      <div className="pre-container">
        {props.item.map((item, index) => {
          title = item.title.toLowerCase();
          return (
            <div key={index} className="dd-column">
              <div className="dd-title">
                <NavLink
                  onClick={props.closeMenu}
                  to={`w/${props.path}-${item.title
                    .replaceAll(" ", "-")
                    .toLowerCase()}`}
                >
                  {item.title}
                </NavLink>
              </div>
              {item.submenuOption.map((item, index) => {
                return (
                  <div key={index} className="dd-option">
                    <NavLink
                      to={`w/${props.path}-${title}-${item.title
                        .replaceAll(" ", "-")
                        .toLowerCase()}`}
                      onClick={props.closeMenu}
                    >
                      {item.title}
                    </NavLink>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
