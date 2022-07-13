import "./Dropdown.css";
export default function Dropdown(props) {
  return (
    <div className="dropdown">
      <div className="pre-container">
        {props.item.map((item, index) => {
          return (
            <div key={index} className="dd-column">
              <div className="dd-title">{item.title}</div>
              {item.submenuOption.map((item, index) => {
                return (
                  <div key={index} className="dd-option">
                    {item.title}
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
