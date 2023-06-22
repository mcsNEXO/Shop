import "./Cart.scss";
import { useEffect, useState } from "react";
import axios from "../../axios";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import useFavorite from "../../hooks/useFavorite";
import { NavLink } from "react-router-dom";
import { useDiscountContext } from "../../context/discountContext";

export default function Cart(props) {
  const [cart, setCart] = useCart("");
  const [products, setProducts] = useState([]);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [favorite, setFavorite] = useFavorite();
  const [auth] = useAuth();
  const { setDiscountContext } = useDiscountContext();

  useEffect(() => {
    getCartProducts();
  }, [JSON.stringify(cart)]);

  const getCartProducts = async () => {
    if (auth) {
      try {
        const res = await axios.post("get-user-products", {
          userId: auth._id,
          type: "cart",
        });
        setProducts(res.data.products);
      } catch (err) {
        console.log(err);
      }
    } else {
      if (cart) {
        try {
          const res = await axios.post("get-cart-not-logged", {
            products: cart,
          });
          setProducts(res.data.products);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const price = () => {
    let price = 0;
    for (let i = 0; i < products?.length; i++) {
      price += products[i].product.price * products[i].quantity;
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
    try {
      const res = await axios.post("get-promocode", { code });
      setDiscount(res?.data?.precent);
      setDiscountContext({ label: code, value: res.data.precent });
    } catch (e) {}
  };

  const updateQuantityProduct = async (value, product) => {
    if (auth) {
      const data = {
        userId: auth._id,
        product: {
          productId: product.product._id,
          color: product.product.colors.color,
          size: product.size,
          quantity: value,
        },
      };
      try {
        const res = await axios.post("update-quantity-product", data);
        setCart(res.data.products, "cart");
      } catch (e) {
        console.log(e);
      }
    } else {
      setCart(
        cart.map((x) =>
          x.productId === product.product._id &&
          x.color === product.product.colors.color &&
          x.size === product.size
            ? { ...x, quantity: Number(value) }
            : x
        ),
        "cart"
      );
    }
  };
  const deleteProduct = async (product) => {
    if (auth) {
      const data = {
        userId: auth._id,
        product: {
          productId: product.product._id,
          color: product.product.colors.color,
          size: product.size,
          quantity: product.quantity,
        },
      };
      try {
        const res = await axios.post("delete-product", data);
        setCart(res.data.products, "cart");
      } catch (e) {
        console.log(e);
      }
    } else {
      setCart(
        cart.filter(
          (x) =>
            JSON.stringify(x) !==
            JSON.stringify({
              userId: null,
              productId: product.product._id,
              size: product.size,
              color: product.product.colors.color,
              quantity: x.quantity,
            })
        ),
        "cart"
      );
    }
  };

  // JSON.stringify(x) !==
  // JSON.stringify({
  //   userId: null,
  //   productId: product.product._id,
  //   size: product.size,
  //   color: product.color,
  //   quantity: x.quantity,
  // })
  const deleteFavProduct = async (product) => {
    if (auth) {
      const data = {
        userId: auth._id,
        product: {
          productId: product.product._id,
          color: product.product.colors.color,
        },
      };
      try {
        const res = await axios.post("delete-favorite", data);
        setFavorite(res.data.products, "favorite");
      } catch (e) {
        console.log(e);
      }
    }
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
              {products?.length > 0 ? (
                products?.map((item, index) => (
                  <div className="keyDiv" key={index}>
                    <div className="box-product">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/img/jpg/shoes/" +
                          item.product.colors.image
                        }
                        alt="product"
                      ></img>
                      <div className="right-side">
                        <div className="information">
                          <div className="name">{item.product.name}</div>
                          <div className="gender">{`${item.product.gender}'s ${item.product.type}`}</div>
                          <div className="color">{`Color: ${item.product.colors.color}`}</div>
                          <div style={{ display: "flex" }}>
                            <div className="size">{`Size: ${item.size} `}</div>
                            <div className="quantity">
                              Quantity:
                              <select
                                value={item?.quantity}
                                onChange={(e) =>
                                  updateQuantityProduct(e.target.value, item)
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
                          <div className="price">${item.product.price}</div>
                          <div
                            className="delete"
                            onClick={() => deleteProduct(item)}
                          >
                            <i className="bi bi-trash3"></i>
                          </div>
                          <div className="favorites">
                            {favorite?.find(
                              (x) =>
                                JSON.stringify({
                                  productId: item?.product._id,
                                  color: item?.product.colors.color,
                                  size: x.size,
                                  _id: x._id,
                                }) === JSON.stringify(x)
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
                                    ? setCart(
                                        {
                                          userId: auth._id,
                                          productId: item.product._id,
                                          color: item.product.colors.color,
                                          size: item.size
                                            ? Number(item.size)
                                            : null,
                                        },
                                        "favorite"
                                      )
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
                <NavLink to={"/checkout"} className="checkout">
                  <button>Checkout</button>
                </NavLink>
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
