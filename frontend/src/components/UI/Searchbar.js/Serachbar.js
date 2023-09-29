import "./Searchbar.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { Skeleton } from "antd";
import axios from "../../../axios";
import { NavLink } from "react-router-dom";
import debounce from "lodash.debounce";

export default function Serachbar(props) {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
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

  const closeSearchBar = () => {
    props.setIsOpen(false);
    setOpen(false);
    inputSearch.current.value = "";
    conResponsiveSearch.current.classList.remove("open");
  };

  const searchHandler = async (e) => {
    setLoading(true);
    if (e.target === inputSearch.current) {
      setOpen(true);
      props.setIsOpen(true);
    } else {
      props.setIsOpen(false);
      setOpen(false);
    }
    try {
      if (!e.target.value) return setSearchedProducts([]);
      const response = await axios.post("get-searched-products", {
        inputText: e.target.value,
      });
      response.data.products.length === 0
        ? setSearchedProducts([])
        : setSearchedProducts(response.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const debouncedChangeHandler = useCallback(debounce(searchHandler, 300), []);

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
            onChange={(e) => debouncedChangeHandler(e)}
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
              onChange={(e) => debouncedChangeHandler(e)}
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
                product.colors?.map((x, index) => (
                  <NavLink
                    to={`product/${product._id}-${x.color}`}
                    onClick={closeSearchBar}
                    key={index.toString()}
                  >
                    <div className="product-search">
                      <div className="image">
                        <img
                          loading="lazy"
                          src={`${
                            process.env.PUBLIC_URL + "/img/jpg/shoes/" + x.image
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
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      gap: 12,
                    }}
                  >
                    <Skeleton.Button active={true} style={{ width: "70%" }} />
                    <Skeleton.Button active={true} style={{ width: "70%" }} />
                    <Skeleton.Button active={true} style={{ width: "70%" }} />
                  </div>
                ) : (
                  searchedProducts?.map((product, index) => (
                    <div className="product-name" key={index.toString()}>
                      <NavLink to={"/products"}>{product.name}</NavLink>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="right">
            {console.log(searchedProducts)}
            {loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Skeleton active />
              </div>
            ) : searchedProducts?.length > 0 ? (
              searchedProducts?.map((product) =>
                product?.colors?.map((x, index) => (
                  <NavLink
                    to={`product/${product._id}-${x.color}`}
                    onClick={closeSearchBar}
                    key={index.toString()}
                  >
                    <div className="s-product">
                      <div className="image">
                        <img
                          loading="lazy"
                          src={`${
                            process.env.PUBLIC_URL + "/img/jpg/shoes/" + x.image
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
