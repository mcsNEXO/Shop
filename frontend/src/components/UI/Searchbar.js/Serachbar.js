import "./Searchbar.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useRef, useState } from "react";
import axios from "../../../axios";
import { NavLink } from "react-router-dom";

export default function Serachbar(props) {
  const [products, setProducts] = useState();
  const [searchedProducts, setSearchedProducts] = useState();
  const conResponsiveSearch = useRef();
  const [open, setOpen] = useState();
  const inputSearch = useRef();
  const handleSearch = (e) => {
    const classes = [...conResponsiveSearch.current.classList];
    window.innerWidth <= 1000 &&
      conResponsiveSearch.current.classList.toggle("open");
    classes.includes("open") &&
      window.innerWidth > 1000 &&
      conResponsiveSearch.current.classList.remove("open");
    document.querySelector(".input input").value = "";
    setSearchedProducts([]);
  };

  const search = async () => {
    const res = await axios.get("fetch-all-products");
    setProducts(res.data.products);
  };

  const closeSearchBar = () => {
    props.setIsOpen(false);
    setOpen(false);
    inputSearch.current.value = "";
    conResponsiveSearch.current.classList.remove("open");
  };

  const searchHandler = (e) => {
    const value = e.target.value;
    if (value && e.target === inputSearch.current) {
      props.setIsOpen(true);
      setOpen(true);
    } else {
      props.setIsOpen(false);
      setOpen(false);
    }
    const newProducts = products.filter((x) =>
      x.name.includes(value) ? x : null
    );
    value === "" ? setSearchedProducts([]) : setSearchedProducts(newProducts);
  };

  const next = () => {
    const container = [...document.querySelectorAll(".slider-search")];
    container.forEach((item, i) => {
      let containerWidth = item.getBoundingClientRect().width;
      item.scrollLeft += containerWidth;
    });
  };
  const pre = () => {
    const container = [...document.querySelectorAll(".slider-search")];
    container.forEach((item, i) => {
      let containerWidth = item.getBoundingClientRect().width;
      item.scrollLeft -= containerWidth;
    });
  };

  useEffect(() => {
    search();
  }, []);
  return (
    <>
      {open ? (
        <div
          className="event"
          onClick={() => {
            setOpen(false);
            props.setIsOpen(false);
            inputSearch.current.value = "";
          }}
        ></div>
      ) : null}
      <div className="search">
        <div className="search-icon">
          <i className="bi bi-search" onClick={(e) => handleSearch(e)}></i>
        </div>
        <form action="/search" method="get">
          <input
            ref={inputSearch}
            type="text"
            className="search-input"
            name="search"
            onChange={(e) => searchHandler(e)}
            placeholder="Search"
          ></input>
        </form>
        <span className="clear-text-search"></span>
      </div>
      <div className="responsive-search" ref={conResponsiveSearch}>
        <div className="header-search">
          <div className="input">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => searchHandler(e)}
            />
            <i className="bi bi-search"></i>
          </div>
          <div className="button">
            <i className="bi bi-arrow-left" onClick={handleSearch}></i>
          </div>
        </div>
        {searchedProducts?.length > 0 ? (
          <div className="hint">
            <div className="slider-search">
              {searchedProducts?.map((product) =>
                product.image.map((x, index) => (
                  <NavLink
                    to={`product/${product._id}-${product.colors[index]}`}
                    onClick={closeSearchBar}
                    key={index.toString()}
                  >
                    <div className="product-search">
                      <div className="image">
                        <img
                          src={`${
                            process.env.PUBLIC_URL + "/img/jpg/shoes/" + x
                          }`}
                          alt="product"
                        />
                      </div>
                      <div className="description">
                        <div className="name">{product.name}</div>
                        <div className="gender">{`${product.gender}'s ${product.type}`}</div>
                      </div>
                      <div className="price">{product.price}$</div>
                    </div>
                  </NavLink>
                ))
              )}
            </div>
            <div className="slider-search-arrows">
              <i className="bi bi-arrow-left preBtn" onClick={pre}></i>
              <i className="bi bi-arrow-right nextBtn" onClick={next}></i>
            </div>
          </div>
        ) : null}
      </div>
      {open & props.isOpen ? (
        <div className="search-products">
          <div className="left">
            <div className="box">
              <h4>Names</h4>
              <div className="product-names">
                {searchedProducts?.map((product, index) => (
                  <div className="product-name" key={index.toString()}>
                    {product.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="right">
            {searchedProducts.length > 0 ? (
              searchedProducts?.map((product) =>
                product.image.map((x, index) => (
                  <NavLink
                    to={`product/${product._id}-${product.colors[index]}`}
                    onClick={closeSearchBar}
                    key={index.toString()}
                  >
                    <div className="s-product">
                      <div className="image">
                        <img
                          src={`${
                            process.env.PUBLIC_URL + "/img/jpg/shoes/" + x
                          }`}
                          alt="product"
                        />
                      </div>
                      <div className="description">
                        <div className="name">{product.name}</div>
                        <div className="gender">{`${product.gender}'s ${product.type}`}</div>
                      </div>
                      <div className="price">{product.price}$</div>
                    </div>
                  </NavLink>
                ))
              )
            ) : (
              <div className="not-found">Not found any products</div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
