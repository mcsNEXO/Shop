import { useEffect, useState } from "react";
import "./Shoe.scss";
import { useParams } from "react-router-dom";
import axios from "../../../../../../axios";
import useCart from "../../../../../../hooks/useCart";

export default function Shoe(props) {
  const { id } = useParams();
  const idProduct = id.split("-")[0];
  const index = id.split("-")[1];
  const [cart, setCart, addProduct] = useCart();
  const [product, setProduct] = useState();
  const pathImage = process.env.PUBLIC_URL + "/img/jpg/shoes/";
  const [currentProduct, setCurretProduct] = useState();

  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    const res = await axios.post("fetch-product", { idProduct });
    setProduct(res.data.product);
  };

  const chooseSize = (e, size) => {
    document
      .querySelectorAll(".size")
      .forEach((x) => x.classList.remove("active"));

    e.target.classList.add("active");
    setCurretProduct({ ...product, size: size });
  };
  return (
    <div className="container-shoe">
      <div className="responsive-desc">
        <div className="res-name">{product?.name}</div>
        <div className="res-gender">{product?.gender}'s shoes</div>
        <div className="res-price">Price: {product?.price}$</div>
        <div className="res-color">Current color: {index}</div>
      </div>
      <div className="left-side">
        <div className="con-img">
          <div>
            <img
              src={pathImage + product?.image.filter((x) => x.includes(index))}
              alt="product"
            />
          </div>
          <div className="under-images">
            {product?.image.map((image, index) => (
              <img src={pathImage + image} alt="underimage" key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="desc">
          <div className="name">{product?.name}</div>
          <div className="gender">{product?.gender}'s shoes</div>
          <div className="price">Price: {product?.price}$</div>
          <div className="color">Current color: {index}</div>
        </div>
        <div className="description">
          Lorem impsum,Lorem impsum,Lorem impsum,Lorem impsum,Lorem impsum,Lorem
          impsum,Lorem impsum,Lorem impsum,Lorem impsum
        </div>
        <div className="size-box">
          <span>Select size: </span>
          <div className="sizes">
            {product?.size.map((size, index) => (
              <div
                className="size"
                key={index}
                onClick={(e) => chooseSize(e, size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <div className="buttons">
          <button
            className="add-to-cart"
            onClick={() => addProduct(currentProduct, index)}
          >
            Add to cart <i className="bi bi-cart-fill"></i>
          </button>
          <button className="favorite">
            {/* <i className="bi bi-heart-fill"></i> */}
            <i className="bi bi-heart"></i>
          </button>
        </div>
        <div className="more-information">
          <div className="size-chart">See size chart</div>
          <div className="product-details">See product details</div>
        </div>
        <div className="rate">
          <span>Assessment: ()</span>
          <span>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
            <i className="bi bi-star"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
