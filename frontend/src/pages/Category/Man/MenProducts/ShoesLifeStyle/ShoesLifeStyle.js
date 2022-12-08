import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import webPath from "../../../../../components/helpers/path";
import axios from "../../../../../axios";
import "./ShoesLifeStyle.scss";
import ErrorModal from "../../../../../components/Modals/ErrorModal/ErrorModal";
import Filters from "../../../../../components/Filters/Filters";

export default function MenShoesLifeStyle(props) {
  const [search, setSearch] = useSearchParams();
  const [webLink, setWebLink] = useState();
  const [shoes, setShoes] = useState();
  const [edit, setEdit] = useState(false);
  const filterRef = useRef();
  const filterBtn = useRef();
  const [open, setOpen] = useState("open");
  const [error, setError] = useState();
  const [dataColors, setDataColors] = useState([
    { color: "black", active: false },
    { color: "gray", active: false },
    { color: "white", active: false },
    { color: "brown", active: false },
    { color: "red", active: false },
    { color: "green", active: false },
    { color: "pink", active: false },
  ]);
  const sortingData = [
    {
      name: "Featured",
    },
    {
      name: "Newest",
    },
    {
      name: "Price: High-Low",
    },
    {
      name: "Price: Low-High",
    },
  ];

  useEffect(() => {
    setWebLink(webPath());
    setActiveColors();
    getProducts();
  }, [search]);

  const setActiveColors = () => {
    const paramsColor = search.get("colors");
    const par = [];
    dataColors.filter((x) =>
      paramsColor?.split(",").filter((z) => {
        if (x.color === z) {
          par.push(z);
          return (x.active = true);
        } else {
          return null;
        }
      })
    );
  };

  const getProducts = async (
    url = { colors: search.get("colors"), sort: search.get("sort") }
  ) => {
    const res = await axios.post("get-shoes", { url });
    setShoes(res.data.shoes);
  };
  const setNewIndex = (item, index) => {
    setShoes(
      shoes.map((x) => (x.name === item.name ? { ...item, index: index } : x))
    );
  };
  const chooseColor = (e, item) => {
    const x = dataColors.map((x) =>
      x.color === item.color ? { ...item, active: !item.active } : x
    );
    setDataColors(x);
    const colors = x
      .filter((p) => p.active)
      .map((p) => p.color)
      .join(",");
    colors ? search.set("colors", colors) : search.delete("colors");
    setSearch(search);
  };

  const sortHandler = (type, item) => {
    switch (type) {
      case "bar":
        filterRef.current.classList.toggle("open");
        break;
      case "item":
        document.querySelectorAll(".box-select span").forEach((span) => {
          span.classList.remove("active");
        });
        item.classList.add("active");
        const sortName = item.textContent.includes("Price:")
          ? item.textContent.split(": ")[1]
          : item.textContent;
        search.set("sort", sortName.toLowerCase());
        filterRef.current.classList.toggle("open");
        break;
      default:
        new Error("This type doesn't exist");
    }
    setSearch(search);
  };

  const filterHandler = (e) => {
    setOpen(open === "open" ? "close" : "open");
    return open;
  };

  return (
    <>
      {error ? <ErrorModal text={error} closeModal={() => setError()} /> : null}
      <div className="conLifestyle">
        <div className="header">
          <div>{webLink}</div>
          <div className="buttons">
            <button
              className="filter-btn"
              ref={filterBtn}
              onClick={(e) => filterHandler(e)}
            >
              {open === "open" ? "Hide filters" : "Show filters"}{" "}
              <i className="bi bi-filter"></i>
            </button>
            <div className="filter-btn">
              <div
                className="default-text"
                ref={filterRef}
                onClick={() => sortHandler("bar")}
              >
                {search.get("sort")
                  ? `Sort by: ${search.get("sort")} `
                  : "Sort by "}
                <i className="bi bi-sort-alpha-down"></i>
              </div>
              <div className="filter-select">
                <div className="box-select">
                  {sortingData.map((z, index) => (
                    <span
                      key={index}
                      onClick={(e) => sortHandler("item", e.target)}
                    >
                      {z.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="con-content">
          <div className={`filter-bar ${open}`}>
            <Filters dataColors={dataColors} chooseColor={chooseColor} />
          </div>
          <div className="contents">
            {shoes?.map((item, index) => (
              <div className="box-product" key={index}>
                <div
                  to={`/${item._id}-${item.colors[item.index]}`}
                  key={`${item._id}-${index}`}
                  onPointerLeave={() => setEdit(false)}
                  onPointerEnter={() => setEdit(index)}
                >
                  <div className="main-img-product">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/img/jpg/shoes/" +
                        item?.image[item.index]
                      }
                      alt="shoe"
                    />
                  </div>
                  <div className={` ${edit === index ? "show" : "hide"}`}>
                    {edit === index ? (
                      <div className="con-imgs">
                        {item.image.map((img, imageIndex) => (
                          <div
                            className={`box-img ${
                              imageIndex === item.index ? "active" : ""
                            }`}
                            key={imageIndex}
                          >
                            <img
                              onPointerEnter={() =>
                                setNewIndex(item, imageIndex)
                              }
                              src={
                                process.env.PUBLIC_URL + "/img/jpg/shoes/" + img
                              }
                              alt="shoe"
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="description">
                    <div className="gender-product">
                      {item?.gender === "man"
                        ? `${item?.gender}'s shoes`
                        : `${item?.gender}'s shoes`}
                    </div>
                    <div className="name-product">{item?.name}</div>
                    <div className="price-product">${item?.price}</div>
                    <div className="colors">
                      {item.colors.length > 1
                        ? `${item.colors.length} colors`
                        : `1 color`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
