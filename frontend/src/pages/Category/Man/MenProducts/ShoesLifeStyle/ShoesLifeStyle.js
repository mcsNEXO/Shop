import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import webPath from "../../../../../components/helpers/path";
import axios from "../../../../../axios";
import "./ShoesLifeStyle.scss";
import ErrorModal from "../../../../../components/Modals/ErrorModal/ErrorModal";
import Filters from "../../../../../components/Filters/Filters";

export default function MenShoesLifeStyle(props) {
  const [webLink, setWebLink] = useState();
  const [shoes, setShoes] = useState();
  const [edit, setEdit] = useState(false);
  const filterRef = useRef();
  const filterSpans = useRef();
  const [error, setError] = useState();
  const [search, setSearch] = useSearchParams();
  const [price, setPrice] = useState(false);
  const [dataColors, setDataColors] = useState([
    { color: "black", active: false },
    { color: "gray", active: false },
    { color: "white", active: false },
    { color: "brown", active: false },
    { color: "red", active: false },
    { color: "green", active: false },
    { color: "pink", active: false },
  ]);

  useEffect(() => {
    setWebLink(webPath());
    const paramsColor = search.get("color");
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
    getProducts();
  }, [dataColors, price]);

  const getProducts = async (url = window.location.href) => {
    const res = await axios.post("get-shoes", { url });
    if (res.data.filters.colors.length !== 0) {
      const colorss = res.data.filters.colors;
      const filterdProducts = res.data.shoes.filter((shoe) => {
        shoe.colors = shoe.colors.filter(
          (color) => colorss.indexOf(color) >= 0
        );
        return (shoe.image = shoe.image.filter((image) =>
          shoe.colors.some((color) => image.includes(color))
        ));
      });
      setShoes(filterdProducts);
    } else {
      setShoes(res.data.shoes);
    }
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
    colors ? setSearch({ color: colors }) : setSearch({});
  };

  console.log(filterSpans);

  const filterBarHandler = () => {
    filterRef.current.classList.toggle("open");
    // setFilterBar(true);
  };

  return (
    <>
      {error ? <ErrorModal text={error} closeModal={() => setError()} /> : null}
      <div className="conLifestyle">
        <div className="header">
          <div>{webLink}</div>
          <div className="buttons">
            <button className="filter-btn">
              Filters <i className="bi bi-filter"></i>
            </button>
            <div className="filter-btn">
              <div
                className="default-text"
                ref={filterRef}
                onClick={filterBarHandler}
              >
                Sort by <i className="bi bi-sort-alpha-down"></i>
              </div>
              <div className="filter-select">
                <div className="box-select">
                  <span ref={filterSpans}>Featured</span>
                  <span ref={filterSpans}>Newest</span>
                  <span ref={filterSpans}>Price: High-Low</span>
                  <span ref={filterSpans}>Price: Low-High</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="con-content">
          <Filters
            dataColors={dataColors}
            chooseColor={chooseColor}
            class="filter open"
          />
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
