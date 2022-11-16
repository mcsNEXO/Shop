import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import webPath from "../../../../../components/helpers/path";
import axios from "../../../../../axios";
import style from "./ShoesLifeStyle.module.css";
import ErrorModal from "../../../../../components/Modals/ErrorModal/ErrorModal";
import useCart from "../../../../../hooks/useCart";

export default function MenShoesLifeStyle(props) {
  const [webLink, setWebLink] = useState();
  const [shoes, setShoes] = useState();
  const [shoe, setShoe] = useState();
  const [error, setError] = useState();
  const [cart, setCart] = useCart();
  const [edit, setEdit] = useState(null);

  const currentCard = (index) => {
    setEdit(() => (edit === index ? null : index));
  };

  useEffect(() => {
    setWebLink(webPath());
    getProducts();
  }, []);

  //   const createCookieInHour = (cookieName, cookieValue, hourToExpire) => {
  //     let date = new Date();
  //     date.setTime(date.getTime()+(hourToExpire*60*60*1000));
  //     document.cookie = cookieName + " = " + cookieValue + "; expires = " +date.toGMTString();
  // }

  const getProducts = async (e) => {
    const res = await axios.get("get-shoes");
    setShoes(res.data.shoes);
  };

  const addToCart = async (product) => {
    // createCookieInHour('cart', JSON.stringify(item), 5);
    if (cart !== null) {
      const exist = cart.find((x) => x._id === product._id);
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
  const findAllProducts = (item) => {
    const products = shoes.filter((x) => x.name === item.name);
    return products;
  };

  const setNewImage = (item, img) => {
    const sth = shoes.map((x) =>
      x.name === item.name ? { ...item, image: img.image } : x
    );
  };
  return (
    <>
      {error ? <ErrorModal text={error} closeModal={() => setError()} /> : null}
      <div className={style.conLifestyle}>
        <div className={style.header}>
          <div>{webLink}</div>
          <div className={style.buttons}>
            <button className={style.filterBtn}>
              Filters <i className="bi bi-filter"></i>
            </button>
            <button className={style.filterBtn}>
              Sort by <i className="bi bi-sort-alpha-down"></i>
            </button>
          </div>
        </div>
        <div className={style.conContent}>
          <div className={style.filterBar}>filter</div>
          <div className={style.content}>
            {shoes
              ?.filter(
                (value, index, self) =>
                  index ===
                  self.findIndex((product) => product.name === value.name)
              )
              .map((item, index) => {
                return (
                  <NavLink
                    to={`/${item._id}`}
                    key={item._id}
                    onPointerLeave={() => currentCard(null)}
                    onPointerEnter={() => currentCard(index)}
                    // onPointerEnter={() => findAllProducts(item)}
                  >
                    <div
                      onClick={() => {}}
                      className={style.boxProduct}
                      key={index}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/img/jpg/shoes/" +
                          item?.image
                        }
                        alt="shoe"
                      />
                      <div
                        className={`${
                          edit === index ? style.show : style.hide
                        }`}
                      >
                        {edit === index ? (
                          <div className={style.conImg}>
                            {findAllProducts(item).map((img, index) => (
                              <div
                                className={style.boxImg}
                                key={index}
                                onPointerEnter={() => setNewImage(item, img)}
                              >
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/img/jpg/shoes/" +
                                    img.type +
                                    "-" +
                                    img.name.replaceAll(" ", "-") +
                                    "-" +
                                    img.colors +
                                    ".png"
                                  }
                                  alt="shoe"
                                />
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* {edit === index && (
                        <div className={style.conImg}>
                          {findAllProducts}
                          {item.colors
                            .filter(
                              (x) =>
                                x !==
                                item.image
                                  .split("-")
                                  .splice(-1, 1)
                                  .toString()
                                  .split(".")[0]
                            )
                            .map((img, index) => (
                              <div className={style.boxImg} key={index}>
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/img/jpg/shoes/" +
                                    item.type +
                                    "-" +
                                    item.name.replaceAll(" ", "-") +
                                    "-" +
                                    img +
                                    ".png"
                                  }
                                  alt="shoe"
                                />
                              </div>
                            ))}
                        </div>
                      )} */}
                      </div>
                      <div className={style.description}>
                        <div className={style.genderProduct}>
                          {item?.gender === "man"
                            ? `${item?.gender}'s shoes`
                            : `${item?.gender}'s shoes`}
                        </div>
                        <div className={style.nameProduct}>{item?.name}</div>
                        <div className={style.priceProduct}>${item?.price}</div>
                        <div className={style.colors}>
                          {findAllProducts(item).length > 1
                            ? `${findAllProducts(item).length} colors`
                            : `1 color`}
                        </div>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
