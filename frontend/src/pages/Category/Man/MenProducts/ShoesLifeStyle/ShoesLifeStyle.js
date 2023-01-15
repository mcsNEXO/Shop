import { useEffect, useRef, useState } from "react";
import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import webPath from "../../../../../components/helpers/path";
import axios from "../../../../../axios";
import "./ShoesLifeStyle.scss";
import ErrorModal from "../../../../../components/Modals/ErrorModal/ErrorModal";
import Filters from "../../../../../components/Filters/Filters";
import { sortingData } from "../../../../../data/sizeShoes";
import useFilterHandler from "../../../../../hooks/useFilterHandler";

export default function MenShoesLifeStyle(props) {
  const [search, setSearch] = useSearchParams();
  const [webLink, setWebLink] = useState();
  const [shoes, setShoes] = useState();
  const [edit, setEdit] = useState(false);
  const filterRef = useRef();
  const filterBtn = useRef();
  const [open, setOpen] = useFilterHandler();
  const [error, setError] = useState();

  useEffect(() => {
    setWebLink(webPath());
    getProducts();
  }, [search]);

  const getProducts = async (
    url = {
      colors: search.get("colors"),
      sort: search.get("sort"),
      price: search.get("price"),
      size: search.get("size"),
    }
  ) => {
    const res = await axios.post("get-shoes", { url });
    return setShoes(res.data.shoes);
  };
  const setNewIndex = (item, index) => {
    return setShoes(
      shoes.map((x) => (x.name === item.name ? { ...item, index: index } : x))
    );
  };

  const sortHandler = (type, item) => {
    switch (type) {
      case "bar":
        filterRef.current.classList.toggle("open");
        break;
      case "item":
        const sortName = item.textContent.includes("Price:")
          ? item.textContent.split(": ")[1]
          : item.textContent;
        search.get("sort") === sortName.toLowerCase()
          ? search.delete("sort")
          : search.set("sort", sortName.toLowerCase());
        filterRef.current.classList.toggle("open");
        break;
      default:
        new Error("This type doesn't exist");
    }
    return setSearch(search);
  };

  const priceHandler = (x, y) => {
    search.set("price", `${x}-${y}`);
    return setSearch(search);
  };

  return (
    <>
      {error ? <ErrorModal text={error} closeModal={() => setError()} /> : null}
      <div className="conLifestyle">
        <div className="header">
          <div className="web-title">{webLink}</div>
          <div className="buttons">
            <button
              className="filter-btn"
              ref={filterBtn}
              onClick={(e) => setOpen(!open)}
            >
              {open ? "Hide filters" : "Show filters"}{" "}
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
                      className={`${
                        z.name.toLowerCase().includes(search.get("sort"))
                          ? "active"
                          : ""
                      }`}
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
          <Filters priceHandler={priceHandler} />
          <div className="contents">
            {shoes?.map((item, index) => (
              <div className="box-product" key={index}>
                <NavLink
                  to={`/product/${item._id}-${item.colors[item.index]}`}
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
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
