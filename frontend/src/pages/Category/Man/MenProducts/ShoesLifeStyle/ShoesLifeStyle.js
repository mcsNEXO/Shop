import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import webPath from "../../../../../components/helpers/path";
import axios from "../../../../../axios";
import "./ShoesLifeStyle.scss";
import ErrorModal from "../../../../../components/Modals/ErrorModal/ErrorModal";
import useCart from "../../../../../hooks/useCart";

export default function MenShoesLifeStyle(props) {
  const [webLink, setWebLink] = useState();
  const [shoes, setShoes] = useState();
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState();
  const [cart, setCart] = useCart();
  const [value, setValue] = useState();
  const [value2, setValue2] = useState();

  useEffect(() => {
    setWebLink(webPath());
    getProducts();
    console.log("did mount");
  }, []);

  const getProducts = async () => {
    const res = await axios.get("get-shoes");
    setShoes(res.data.shoes);
  };

  const addToCart = async (item) => {
    const product = {
      ...item,
      colors: item.colors[item.index],
      image: item.image[item.index],
    };
    if (cart !== null) {
      const exist = cart.find(
        (x) => x._id === product._id && x.colors === product.colors
      );
      if (exist?.quantity === 10) {
        return setError("The quantity of this product is maximum!");
      } else {
        setError(false);
      }
      if (exist) {
        setCart(
          cart.map((x) =>
            x._id === product._id
              ? { ...exist, quantity: (exist.quantity += 1) }
              : x
          )
        );
      } else {
        const items = [...cart, { ...product, quantity: 1 }];
        setCart(items);
      }
    } else {
      setCart([{ ...product, quantity: 1 }]);
    }
  };

  const setNewIndex = (item, index) => {
    setShoes(
      shoes.map((x) => (x.name === item.name ? { ...item, index: index } : x))
    );
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
                  <label>
                    {value} - {value2}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    onChange={(e) => setValue(e.target.value)}
                    className="input-price"
                  />
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    onChange={(e) => setValue2(e.target.value)}
                    className="input-price"
                  />
                </div>
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
