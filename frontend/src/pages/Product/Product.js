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

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const res = await axios.post("fetch-product", { idProduct });
    setProduct(res?.data?.product);
    setCurrentProduct(
      res?.data?.product?.colors.filter(
        (item) => item.color === colorProduct
      )[0]
    );
  };
  const chooseSize = (e, size) => {
    document
      .querySelectorAll(".size")
      .forEach((x) => x.classList.remove("active"));
    e.target.classList.add("active");
    setCurrentSize(size);
  };
  {
    console.log(product);
  }
  const deleteFavProduct = async () => {
    try {
      const res = await axios.post("delete-favorite", {
        userId: auth._id,
        product: {
          productId: product._id,
          color: currentProduct.color,
        },
      });
      console.log(res);
      setCart(res.data.products, "favorite");
    } catch (e) {
      console.log(e);
    }
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
                  to={`/product/${product._id}-${item.color}`}
                  key={index}
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
                  ? setCart(
                      {
                        userId: auth._id,
                        productId: product._id,
                        size: currentSize ? Number(currentSize) : null,
                        color: currentProduct.color,
                        quantity: 1,
                      },
                      "cart"
                    )
                  : setError("Select size!")
              }
            >
              Add to cart <i className="bi bi-cart-fill"></i>
            </button>
            {favorite?.find(
              (x) =>
                JSON.stringify({
                  productId: product?._id,
                  color: currentProduct?.color,
                  size: x.size,
                  _id: x._id,
                }) === JSON.stringify(x)
            ) ? (
              <button
                className="favorite"
                onClick={() =>
                  auth
                    ? deleteFavProduct()
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
                    ? setCart(
                        {
                          productId: product._id,
                          userId: auth._id,
                          color: colorProduct,
                          size: currentSize ? Number(currentSize) : null,
                        },
                        "favorite"
                      )
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
