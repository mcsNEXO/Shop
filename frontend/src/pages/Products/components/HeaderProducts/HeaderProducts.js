import webPath from "../../../../components/helpers/path";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import useFilterHandler from "../../../../hooks/useFilterHandler";
import { sortingData } from "../../../../data/sizeShoes";

export default function HeaderProducts() {
  const [webLink, setWebLink] = useState();
  const [search, setSearch] = useSearchParams();

  const filterRef = useRef();
  const [open, setOpen] = useFilterHandler();

  useEffect(() => {
    setWebLink(webPath());
  }, [search, window.location.pathname]);

  const openSortData = () => {
    return filterRef.current.classList.toggle("open");
  };

  const sortHandler = (text) => {
    try {
      const sortName = text.includes("Price:") ? text.split(": ")[1] : text;
      search.get("sort") === sortName.toLowerCase()
        ? search.delete("sort")
        : search.set("sort", sortName.toLowerCase());
    } catch (e) {
      throw new Error("This type doesn't exist");
    }
    filterRef.current.classList.toggle("open");
    setSearch(search);
  };

  return (
    <div className="header">
      <div className="web-title">{webLink}</div>
      <div className="buttons">
        <button className="filter-btn" onClick={() => setOpen(!open)}>
          {open ? "Hide filters" : "Show filters"}
          <i className="bi bi-filter"></i>
        </button>
        <div className="filter-btn">
          <div className="default-text" ref={filterRef} onClick={openSortData}>
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
                    z.label.toLowerCase().includes(search.get("sort"))
                      ? "active"
                      : ""
                  }`}
                  key={index}
                  onClick={(e) => sortHandler(e.target.textContent)}
                >
                  {z.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
