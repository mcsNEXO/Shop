import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import webPath from "../../../../../components/helpers/path";
import axios from "../../../../../axios";
import style from "./ShoesLifeStyle.module.css";

export default function MenShoesLifeStyle(props) {
  const storageData = JSON.parse(localStorage.getItem("cart"));
  const [webLink, setWebLink] = useState();
  const [shoes, setShoes] = useState();
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
    if (storageData === null) {
      await localStorage.setItem("cart", JSON.stringify([]));
    }
    console.log("storage", storageData);
    console.log("item", product);
    const exist = storageData.find((x) => x._id === product._id);
    console.log("exist", exist);
    if (exist) {
      localStorage.setItem(
        "cart",
        JSON.stringify(
          storageData.map((x) =>
            x._id === product._id
              ? { ...exist, quantity: (exist.quantity += 1) }
              : x
          )
        )
      );
    } else {
      const items = [...storageData, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(items));
    }
  };
  return (
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
          {shoes?.map((item, index) => {
            return (
              <div
                className={style.boxProduct}
                key={index}
                onClick={() => addToCart(item)}
              >
                <img
                  src={process.env.PUBLIC_URL + "/img/jpg/shoes/" + item?.image}
                  alt="image"
                />
                <div className={style.description}>
                  <div className={style.genderProduct}>
                    {item?.gender === "man"
                      ? `${item?.gender}'s shoes`
                      : `${item?.gender}'s shoes`}
                  </div>
                  <div className={style.nameProduct}>{item?.name}</div>
                  <div className={style.priceProduct}>${item?.price}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
