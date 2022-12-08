import { useState } from "react";

export default function Filters(props) {
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(3000);
  return (
    <>
      <span className="title-filter">Filter</span>
      <hr className="filter-line" />
      <div className="options">
        <div className="price">
          <div className="title-option">Price</div>
          <div className="option">
            <input
              type="number"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              className="inp-price"
            />
            &nbsp;-&nbsp;
            <input
              type="number"
              onChange={(e) => setValue2(e.target.value)}
              value={value2}
              className="inp-price"
            />
          </div>
          <div className="d-center">
            <button
              className="price-btn"
              onClick={() => props.priceHandler(value, value2)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <hr className="filter-line"></hr>
      <div className="colors">
        <div className="title-option">Colors</div>
        <div className="option">
          {props.dataColors.map((item, index) => (
            <button
              className="color-item"
              onClick={(e) => props.chooseColor(e, item)}
              key={index}
            >
              <div
                style={{ backgroundColor: item.color }}
                className={`${item.active ? "active" : ""}`}
              >
                {item.active ? (
                  <i
                    className="bi bi-check-lg"
                    style={
                      item.color === "white"
                        ? { color: "black" }
                        : { color: "white" }
                    }
                  ></i>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
