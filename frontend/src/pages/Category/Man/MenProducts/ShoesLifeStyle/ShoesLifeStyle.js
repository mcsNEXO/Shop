import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import webPath from "../../../../../components/helpers/path";
import axios from "../../../../../axios";
import "./ShoesLifeStyle.scss";
import ErrorModal from "../../../../../components/Modals/ErrorModal/ErrorModal";

export default function MenShoesLifeStyle(props) {
  const [webLink, setWebLink] = useState();
  const [shoes, setShoes] = useState();
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState();
  const [search, setSearch] = useSearchParams();
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(3000);
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
          x.active = true;
        }
      })
    );
    getProducts();
  }, [dataColors]);

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
    // getProducts(colors.split(","));
  };
  const fun = () => {
    // if (res.data.filters.colors.length !== 0) {
    //   console.log(res.data.filters.colors);
    //   const colorss = res.data.filters.colors;
    //   res.data.shoes.filter((product) => {
    //     const newColors = product.colors.filter((color) =>
    //       colorss.some((x) => x === color)
    //     );
    //     return setShoes(
    //       res.data.shoes.map((x) => {
    //         x.colors = newColors;
    //         x.image = x.image.filter((image) =>
    //           newColors.some((x) => image.includes(x))
    //         );
    //         return x;
    //       })
    //     );
    //   });
    // } else {
    //   setShoes(res.data.shoes);
    // }
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
            <button className="filter-btn">
              Sort by <i className="bi bi-sort-alpha-down"></i>
            </button>
          </div>
        </div>
        <div className="con-content">
          <div className="filter-bar">
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
              </div>
            </div>
            <hr className="filter-line"></hr>
            <div className="colors">
              <div className="title-option">Colors</div>
              <div className="option">
                {dataColors.map((item, index) => (
                  <button
                    className="color-item"
                    onClick={(e) => chooseColor(e, item)}
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
                        {item.image.map((img, index) => (
                          <div
                            className={`box-img ${
                              index === item.index ? "active" : ""
                            }`}
                            key={index}
                          >
                            <img
                              onPointerEnter={() => setNewIndex(item, index)}
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
