import { useState } from "react";
import "./SizeModal.scss";
import useError from "../../../hooks/useError";
import useCart from "../../../hooks/useCart";
import ErrorModal from "../ErrorModal/ErrorModal";
import useAuth from "../../../hooks/useAuth";

export default function SizeModal(props) {
  const [currentSize, setCurrentSize] = useState();
  const [error, setError] = useError();
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const chooseSize = (e, size) => {
    document
      .querySelectorAll(".size")
      .forEach((x) => x.classList.remove("active"));

    e.target.classList.add("active");
    setCurrentSize(size);
  };
  const addProduct = async () => {
    if (currentSize) {
      try {
        setCart(
          {
            userId: auth._id,
            productId: props.product.product._id,
            size: currentSize,
            color: props.product.product.colors.color,
            quantity: 1,
          },
          "cart"
        );
        props.closeModal();
      } catch (e) {
        console.log(e);
      }
    } else {
      return setError("Select size!");
    }
  };
  return (
    <>
      {error ? <ErrorModal /> : null}
      <div className="black-bg"></div>
      <div className="container-size-modal">
        <div className="box">
          <i className="bi bi-x-circle" onClick={props.closeModal}></i>
          <div className="left-side">
            <img
              src={
                process.env.PUBLIC_URL +
                "img/jpg/shoes/" +
                props?.product?.product?.colors.image
              }
              alt="shoe"
            />
          </div>
          <div className="right-side">
            <div className="size-title">Select size</div>
            <div className="sizes-box">
              {!props.product.size ? (
                props?.product?.product?.colors.sizes?.map((x, index) => (
                  <div
                    className="size"
                    onClick={(e) => chooseSize(e, x.size)}
                    key={index.toString()}
                  >
                    {x.size}
                  </div>
                ))
              ) : (
                <div className="size">{props.product.size}</div>
              )}
            </div>
            <div className="btn-add">
              <button onClick={addProduct}>Add product</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
