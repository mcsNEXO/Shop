import "./Checkout.scss";
import { deliveryOptions } from "../../data/deliveryData";
import React, { useEffect, useState } from "react";
import axios from "../../axios";
import useAuth from "../../hooks/useAuth";
import { useDiscountContext } from "../../context/discountContext";
import EditAdressModal from "./components/EditAdressModal";
import { useDeliveryOption } from "../../context/deliveryOptionContext";
import { PulseLoader } from "react-spinners";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [openedAdressModal, setOpenedAdressModal] = React.useState(false);
  const [transport, setTransport] = React.useState();
  const [products, setProducts] = React.useState();
  const [auth] = useAuth();
  const { deliveryOption, setDeliveryOption } = useDeliveryOption();
  const { discountContext } = useDiscountContext();

  const getCartProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.post("get-user-products", {
        userId: auth._id,
        type: "cart",
      });
      setProducts(res.data.products);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  const handleDeliveryOption = (e, value) => {
    document
      .querySelectorAll(".btn-checkout")
      .forEach((item) => item.classList.remove("active"));
    e.target.nodeName === "I"
      ? e.target.parentNode.classList.add("active")
      : e.target.classList.add("active");
    setTransport(value);
  };
  const price = React.useMemo(() => {
    let price = 0;
    for (let i = 0; i < products?.length; i++) {
      price += products[i].product.price * products[i].quantity;
    }
    let deliveryCost = 0;
    let endPrice = (price * (100 - discountContext.value)) / 100 + deliveryCost;

    return { price, endPrice };
  });

  const makeOrder = async () => {
    const res = await axios.post("get-product", { userId: auth._id });
    console.log(res);
    const orderData = {
      user: auth._id,
      totalPrice: price.endPrice,
      uniqueCode: Date.now(),
      orderData: deliveryOption,
      products: res.data.products,
    };
    try {
      // const res = await axios.post("order", orderData, {
      //   headers: {
      //     authorization: `Bearer ${auth?.token}`,
      //     "Content-Type": "application/json",
      //   },
      // });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="checkout-container">
      <div className="options-checkout">
        <div style={{ width: "80%" }}>
          <div className="title-checkout">Delivery option</div>
          <div className="buttons">
            {deliveryOptions?.map((item, index) => {
              return (
                <div
                  className="btn-checkout"
                  onClick={(e) => handleDeliveryOption(e, item.value)}
                  key={index}
                >
                  {item.label}
                  <i className={item.icon}></i>
                </div>
              );
            })}
          </div>
          <div className="user-data">
            <div className="title-data">
              Shipping address
              <span
                className="edit-btn"
                onClick={() => setOpenedAdressModal(!openedAdressModal)}
              >
                Edit
              </span>
            </div>
            <EditAdressModal
              openedAdressModal={openedAdressModal}
              closeAdressModal={() => setOpenedAdressModal(false)}
            />
            {JSON.stringify(deliveryOption) && !openedAdressModal ? (
              <>
                <div className="data">
                  Full name:
                  {" " +
                    deliveryOption?.firstName +
                    " " +
                    deliveryOption?.lastName}
                </div>
                <div className="data">
                  Adress: {deliveryOption?.address}, {deliveryOption?.locality},
                  {deliveryOption?.postalCode}, PL
                </div>
                <div className="data">
                  Phone number: {deliveryOption?.phoneNumber}
                </div>
                <div className="data">Email: {deliveryOption?.email}</div>
              </>
            ) : null}

            <div className="title-data">Shipping speed</div>
            <div className="data">Free</div>
            <div className="data">Delivery 3 days</div>
          </div>
          <button className="btn-buy" onClick={makeOrder}>
            Buy
          </button>
        </div>
      </div>

      <div className="cart">
        <div>
          <span className="title-price">Total Price</span>
          <div className="spans">
            <span>Value of products: </span>
            <span>{price.price}$</span>
          </div>
          <div className="spans">
            <span>Cost of delivery</span>
            <span>{0}$</span>
          </div>
          {discountContext.label && discountContext.value && (
            <div className="spans" style={{ marginTop: 10, marginBottom: 10 }}>
              <span style={{ color: "green", fontWeight: "600" }}>
                {discountContext.label}
              </span>
              <span style={{ color: "red", fontWeight: "600" }}>
                -{discountContext.value}%
              </span>
            </div>
          )}
          <div className="spans">
            <span style={{ fontWeight: "600" }}>Sum </span>
            <span style={{ fontWeight: "600" }}>{price.endPrice}$</span>
          </div>
        </div>
        <div className="title-cart">In your cart: </div>
        <div
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {loading ? (
            <PulseLoader color="black" />
          ) : (
            products?.map((item, index) => {
              return (
                <div key={index}>
                  <div className="container-product">
                    <img
                      loading="lazy"
                      src={
                        process.env.PUBLIC_URL +
                        "/img/jpg/shoes/" +
                        item.product.colors.image
                      }
                      alt="product"
                      className="image"
                    />
                    <div className="description">
                      <span className="name">{item.product.name}</span>
                      <span className="other">{`${item.product.gender}'s ${item.product.type}`}</span>
                      <span className="other">
                        Color:{item.product.colors.color}
                      </span>
                      <span className="other">Size:{item.size}</span>
                      <span className="other">Quantity:{item.quantity}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
