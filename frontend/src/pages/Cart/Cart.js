import "./Cart.scss";
import { useEffect, useState } from "react";
import axios from "../../axios";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import useFavorite from "../../hooks/useFavorite";

export default function Cart(props) {
  const [cart, setCart] = useCart("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [favorite, setFavorite] = useFavorite();
  const [auth] = useAuth();

  const price = () => {
    let price = 0;
    for (let i = 0; i < cart?.length; i++) {
      price += cart[i].price * cart[i].quantity;
    }
    let deliveryCost = 0;
    let endPrice = (price * (100 - discount)) / 100 + deliveryCost;

    return { price, endPrice };
  };

  const expandContract = () => {
    const el = document.querySelector(".div-promo");
    const i = document.querySelector(".bi-caret-down-fill");
    el.classList.toggle("hide");
    el.classList.toggle("show");
    i.classList.toggle("rotate");
  };

  const acceptCode = async (e) => {
    e.preventDefault();
    const res = await axios.post("get-promocode", { code });
    setDiscount(res?.data?.precent);
  };

  const updateQuantity = async (value, item) => {
    if (auth) {
      const data = {
        userId: auth._id,
        product: item,
        quantity: value,
      };
      const res = await axios.post("update-product", data);
      setCart(res.data.cart);
    } else {
      setCart(
        cart.map((x) =>
          x._id === item._id && x.color === item.color && x.size === item.size
            ? { ...x, quantity: Number(value) }
            : x
        )
      );
    }
  };
  const deleteProduct = async (product) => {
    if (auth) {
      const data = {
        userId: auth._id,
        product: product,
      };
      const res = await axios.post("delete-product", data);
      setCart(res.data.cart);
    } else {
      setCart(
        cart.filter((x) => JSON.stringify(x) !== JSON.stringify(product))
      );
    }
  };
  const deleteFavProduct = async (product) => {
    const data = {
      userId: auth._id,
      product: product,
    };
    const res = await axios.post("delete-favorite", data);
    setFavorite(res.data.newFavorites);
  };
  return (
    <>
      {error ? <ErrorModal text={error} /> : null}
      <div className="cart-container">
        <div style={{ width: "100%" }}>
          <div className="title-cart">Cart</div>
          <hr></hr>
          <div className="box">
            <div className="box-of-products">
              {cart?.length > 0 ? (
                cart?.map((item, index) => (
                  <div className="keyDiv" key={index}>
                    <div className="box-product">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/img/jpg/shoes/" +
                          item.image
                        }
                        alt="product"
                      ></img>
                      <div className="right-side">
                        <div className="information">
                          <div className="name">{item.name}</div>
                          <div className="gender">{`${item.gender}'s ${item.type}`}</div>
                          <div className="color">{`Color: ${item.colors}`}</div>
                          <div style={{ display: "flex" }}>
                            <div className="size">{`Size: ${item.size} `}</div>
                            <div className="quantity">
                              Quantity:
                              <select
                                value={item?.quantity}
                                onChange={(e) =>
                                  updateQuantity(e.target.value, item)
                                }
                              >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="other-information">
                          <div className="price">${item.price}</div>
                          <div
                            className="delete"
                            onClick={() => deleteProduct(item)}
                          >
                            <i className="bi bi-trash3"></i>
                          </div>
                          {console.log(
                            favorite?.find(
                              (x) =>
                                JSON.stringify(x) ===
                                JSON.stringify({
                                  ...item,
                                  size: x.size,
                                  quantity: 1,
                                })
                            )
                          )}
                          <div className="favorites">
                            {favorite?.find(
                              (x) =>
                                JSON.stringify(x) ===
                                JSON.stringify({
                                  ...item,
                                  size: x.size,
                                  quantity: 1,
                                })
                            ) ? (
                              <button
                                className="favorite"
                                onClick={() =>
                                  auth
                                    ? deleteFavProduct(item)
                                    : setError(
                                        "Sign in to add product to favorites!"
                                      )
                                }
                              >
                                <i className="bi bi-heart-fill"></i>
                              </button>
                            ) : (
                              <button
                                className="favorite"
                                onClick={() =>
                                  auth
                                    ? setFavorite(item)
                                    : setError(
                                        "Sign in to add product to favorites!"
                                      )
                                }
                              >
                                <i className="bi bi-heart"></i>
                              </button>
                            )}
                          </div>
                        </div>
                        <hr></hr>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="box-product">No items in the cart</div>
              )}
            </div>
            <div className="to-pay">
              <div className="title-pay">To pay</div>
              <div className="box-pay">
                <div className="style-div">
                  <div className="value">Value of products </div>
                  <span>${price().price}</span>
                </div>
                <div className="style-div">
                  <div className="delivery">Cost of delivery </div>
                  <span>$0</span>
                </div>
                {discount ? (
                  <>
                    <div className="style-div">
                      <div className="discount">Total discount: </div>
                      <span>${(price().price * discount) / 100}</span>
                    </div>
                    <div className="style-div">
                      <div className="code-discount">
                        "{code}" -{discount}% off{" "}
                      </div>
                      <span onClick={() => setDiscount("")}>
                        <i className="bi bi-x-lg"></i>
                      </span>
                    </div>
                  </>
                ) : null}
                <hr></hr>
                <div className="style-div">
                  <div className="sum">Sum</div>
                  <span>${price().endPrice}</span>
                </div>
                <hr></hr>
                <button className="checkout">Checkout</button>
              </div>
              <div className="promo-code">
                <span onClick={expandContract}>
                  Add promo code <i className="bi bi-caret-down-fill"></i>
                </span>
                <div className="div-promo hide">
                  <form onSubmit={acceptCode}>
                    <input
                      type="text"
                      name="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <button className="btn-promo">Save</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
