import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { shoesSize } from "../../data/sizeShoes";
import { shoesColors } from "../../data/sizeShoes";
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

  const chooseSize = (size) => {
    size === Number(search.get("size"))
      ? search.delete("size")
      : search.set("size", size);
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
          <span className="title-filter">Filter</span>
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
              {shoesColors.map((item, index) => (
                <button
                  className="color-item"
                  onClick={(e) => chooseColor(item.color)}
                  key={index}
                >
                  <div
                    style={{ backgroundColor: item.color }}
                    className={`${
                      search.get("colors")?.includes(item.color) ? "active" : ""
                    }`}
                  >
                    {search.get("colors")?.includes(item.color) ? (
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
          <hr className="filter-line"></hr>
          <div className="size responsive">
            <div className="title-option">Size</div>
            <div className="option">
              {shoesSize.map((size, index) => (
                <div
                  key={index}
                  className={`number ${
                    Number(search.get("size")) === size.size ? "active" : ""
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
