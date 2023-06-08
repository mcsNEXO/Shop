import { useEffect, useState } from "react";
import "./Product.scss";
import { NavLink, useParams } from "react-router-dom";
import axios from "../../axios";
import useCart from "../../hooks/useCart";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import useError from "../../hooks/useError";
import useAuth from "../../hooks/useAuth";
import useFavorite from "../../hooks/useFavorite";

export default function Product(props) {
  const { id } = useParams();
  const idProduct = id.split("-")[0];
  const colorProduct = id.split("-")[1];
  const [product, setProduct] = useState();
  const [currentProduct, setCurrentProduct] = useState();

  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const pathImage = process.env.PUBLIC_URL + "/img/jpg/shoes/";
  const [currentSize, setCurrentSize] = useState();
  const [error, setError] = useError();
  const [favorite, setFavorite] = useFavorite();
  const newProduct = {
    ...product,
    colors: product?.colors?.filter((x) => x === colorProduct).toString(),
    image: product?.image?.filter((x) => x.includes(colorProduct)).toString(),
    quantity: 1,
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    const res = await axios.post("fetch-product", { idProduct });
    setProduct(res.data.product);
    console.log(
      res.data.product.colors.filter((item) => item.color === colorProduct)
    );
    setCurrentProduct(
      res.data.product.colors.filter((item) => item.color === colorProduct)[0]
    );
  };
  const chooseSize = (e, size) => {
    document
      .querySelectorAll(".size")
      .forEach((x) => x.classList.remove("active"));

    e.target.classList.add("active");
    setCurrentSize(size);
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
      <div className="container-shoe">
        <div className="responsive-desc">
          <div className="res-name">{product?.name}</div>
          <div className="res-gender">{product?.gender}'s shoes</div>
          <div className="res-price">Price: {product?.price}$</div>
          <div className="res-color">
            Current color: {currentProduct?.color}
          </div>
        </div>
        <div className="left-side">
          <div className="con-img">
            <div>
              <img src={pathImage + currentProduct?.image} alt="product" />
            </div>
            <div className="under-images">
              {product?.colors.map((item, index) => (
                <NavLink
                  key={index}
                  to={`/product/${product._id}-${item.color}`}
                >
                  <img src={pathImage + item.image} alt="underimage" />
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="desc">
            <div className="name">{product?.name}</div>
            <div className="gender">
              {product?.gender}'s {product?.type}
            </div>
            <div className="price">Price: {product?.price}$</div>
            <div className="color">Current color: {currentProduct?.color}</div>
          </div>
          <div className="description">{product?.description}</div>
          <div className="size-box">
            <span>Select size: </span>
            <div className="sizes">
              {currentProduct?.sizes?.map((item, index) => (
                <div
                  className="size"
                  key={index}
                  onClick={(e) => chooseSize(e, item.size)}
                >
                  {item.size}
                </div>
              ))}
            </div>
          </div>
          <div className="buttons">
            <button
              className="add-to-cart"
              onClick={() =>
                currentSize
                  ? setCart({ ...product, size: currentSize })
                  : setError("Select size!")
              }
            >
              Add to cart <i className="bi bi-cart-fill"></i>
            </button>
            {favorite?.find(
              (x) =>
                JSON.stringify({ ...newProduct, size: x.size }) ===
                JSON.stringify(x)
            ) ? (
              <button
                className="favorite"
                onClick={() =>
                  auth
                    ? deleteFavProduct(newProduct)
                    : setError("Sign in to add product to favorites!")
                }
              >
                <i className="bi bi-heart-fill"></i>
              </button>
            ) : (
              <button
                className="favorite"
                onClick={() =>
                  auth
                    ? currentSize
                      ? setFavorite({ ...product, size: currentSize })
                      : setFavorite(product)
                    : setError("Sign in to add product to favorites!")
                }
              >
                <i className="bi bi-heart"></i>
              </button>
            )}
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
    </>
  );
}
