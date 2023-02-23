import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { shoesSize } from "../../data/sizeShoes";
import { colorsData } from "../../data/sizeShoes";
import useFilterHandler from "../../hooks/useFilterHandler";

export default function Filters(props) {
  const [search, setSearch] = useSearchParams();
  const [value, setValue] = useState(search.get("price")?.split("-")[0] ?? 0);
  const [value2, setValue2] = useState(
    search.get("price")?.split("-")[1] ?? 3000
  );
  const [open, setOpen] = useFilterHandler();
  let resizeWindow = () => {
    window.innerWidth <= 950 ? setOpen(false) : console.log();
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  const chooseSize = (currentSize) => {
    const size = search.get("size");
    if (!size) {
      search.set("size", currentSize);
    } else {
      let x = size.split(",");
      size.includes(currentSize.toString())
        ? (x = x.filter((z) => z !== currentSize.toString()))
        : x.push(currentSize);
      search.set("size", x);
      search.get("size") !== "" ? search.set("size", x) : search.delete("size");
    }
    setSearch(search);
  };

  const chooseColor = (color) => {
    const colors = search.get("colors");
    if (!colors) {
      search.set("colors", color);
    } else {
      let x = colors.split(",");
      colors.includes(color)
        ? (x = x.filter((z) => z !== color))
        : x.push(color);
      search.set("colors", x);
      search.get("colors") !== ""
        ? search.set("colors", x)
        : search.delete("colors");
    }
    setSearch(search);
  };

  return (
    <>
      <div className={`con-filter-bar ${open ? "open" : "close"}`}>
        <div className={`filter-bar`}>
          <i
            className="bi bi-x-circle closer"
            onClick={() => setOpen(false)}
          ></i>
          <span className="title-filter">
            Filter{" "}
            {search.toString() !== "" ? `(${props.products?.length})` : ""}
          </span>
          <hr className="filter-line" />
          <div className="options">
            <div className="price responsive">
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
          <div className="colors responsive">
            <div className="title-option">Colors</div>
            <div className="option">
              {colorsData.map((color, index) => (
                <button
                  className="color-item"
                  onClick={(e) => chooseColor(color)}
                  key={index}
                >
                  <div
                    style={{ backgroundColor: color }}
                    className={`${
                      search.get("colors")?.includes(color) ? "active" : ""
                    }`}
                  >
                    {search.get("colors")?.includes(color) ? (
                      <i
                        className="bi bi-check-lg"
                        style={
                          color === "white"
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
          <hr className="filter-line"></hr>
          <div className="size responsive">
            <div className="title-option">Size</div>
            <div className="option">
              {shoesSize.map((size, index) => (
                <div
                  key={index}
                  className={`number ${
                    search.get("size")?.includes(size.size) ? "active" : ""
                  }`}
                  onClick={() => chooseSize(size.size)}
                >
                  {size.size}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
