import "./Searchbar.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRef } from "react";

export default function Serachbar(props) {
  const conResponsiveSearch = useRef();
  const handleSearch = () => {
    window.innerWidth <= 1000
      ? conResponsiveSearch.current.classList.toggle("open")
      : console.log();
  };
  return (
    <>
      <div className="search">
        <div className="search-icon">
          <i className="bi bi-search" onClick={handleSearch}></i>
        </div>
        <form action="/search" method="get">
          <input
            type="text"
            className="search-input"
            name="search"
            placeholder="Search"
          ></input>
        </form>
        <span className="clear-text-search"></span>
      </div>
      <div className="responsive-search" ref={conResponsiveSearch}>
        <div className="header-search">
          <div className="input">
            <input type="text" placeholder="Search" />
            <i className="bi bi-search"></i>
          </div>
          <div className="button">
            <i className="bi bi-arrow-left" onClick={handleSearch}></i>
          </div>
        </div>
        <div className="hint"></div>
      </div>
    </>
  );
}
