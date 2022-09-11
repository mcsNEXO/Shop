import "./Option.css";
import { NavLink } from "react-router-dom";
import { optionItems } from "./optionItems";

export default function Option(props) {
  return (
    <div className="container-sex">
      <div className="title">
        <span className="title-option">Choose clothes for yourself</span>
      </div>
      <div className="option-sex">
        {optionItems.map((item) => {
          return (
            <div key={item.id} className="option-choose">
              <img src={item.img} alt={item.alt} />
              <div className="title-choose">{item.title}</div>
              <div className="btn-choose">
                <button>
                  <NavLink to={item.path}>{item.desc}</NavLink>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
