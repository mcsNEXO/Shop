import "./Dropdown.css";
import { NavLink } from "react-router-dom";
export default function Dropdown(props) {
  let title;
  return (
    <div className="dropdown">
      <div className="pre-container">
        {props.item.map((item1, index) => {
          title = item1.title.toLowerCase();
          return (
            <div key={index} className="dd-column">
              <div className="dd-title">
                <NavLink
                  onClick={props.closeMenu}
                  to={`w/${props.path}-${item1.title
                    .replaceAll(" ", "-")
                    .toLowerCase()}`}
                >
                  {item1.title}
                </NavLink>
              </div>
              {item1.submenuOption.map((item2, index) => {
                return (
                  <div key={index} className="dd-option">
                    <NavLink
                      to={`w/${props.gender}/${
                        item1.value
                      }/${item2.value?.replaceAll(" ", "-")}`}
                      onClick={props.closeMenu}
                    >
                      {item2.title}
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
