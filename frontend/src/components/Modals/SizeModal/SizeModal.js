import { useState } from "react";
import "./SizeModal.scss";
import useError from "../../../hooks/useError";
import useCart from "../../../hooks/useCart";
import ErrorModal from "../ErrorModal/ErrorModal";

export default function SizeModal(props) {
  const [currentSize, setCurrentSize] = useState();
  const [error, setError] = useError();
  const [cart, setCart] = useCart();

  const chooseSize = (e, size) => {
    document
      .querySelectorAll(".size")
      .forEach((x) => x.classList.remove("active"));

    e.target.classList.add("active");
    setCurrentSize(size);
  };
  const addProduct = () => {
    if (currentSize) {
      setCart({ ...props.product, size: currentSize });
      return props.setOpen(false);
    } else {
      return setError("Select size!");
    }
  };
  return (
    <>
      {console.log(props.product)}
      {error ? <ErrorModal /> : null}
      <div className="black-bg"></div>
      <div className="container-size-modal">
        <div className="box">
          <i
            className="bi bi-x-circle"
            onClick={() => props.setOpen(false)}
          ></i>
          <div className="left-side">
            <img
              src={
                process.env.PUBLIC_URL +
                "img/jpg/shoes/" +
                props?.product?.image
              }
              alt="shoe"
            />
          </div>
          <div className="right-side">
            <div className="size-title">Select size</div>
            <div className="sizes-box">
              {Array.isArray(props.product.size) ? (
                props.product.size.map((x, index) => (
                  <div
                    className="size"
                    onClick={(e) => chooseSize(e, x)}
                    key={index.toString()}
                  >
                    {x}
                  </div>
                ))
              ) : (
                <div className="size">{props.product.size}</div>
              )}
            </div>
            <div className="btn-add">
              <button onClick={() => addProduct()}>Add product</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
