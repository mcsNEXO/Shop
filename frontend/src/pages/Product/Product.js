import React, { useEffect, useState } from "react";
import "./Product.scss";
import { NavLink, useParams } from "react-router-dom";
import axios from "../../axios";
import useCart from "../../hooks/useCart";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import useError from "../../hooks/useError";
import useAuth from "../../hooks/useAuth";
import useFavorite from "../../hooks/useFavorite";
import { Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Product(props) {
  const { id } = useParams();
  const idProduct = id.split("-")[0];
  const colorProduct = id.split("-")[1];
  const [loading, setLoading] = React.useState(false);
  const [loadingAddFunction, setLoadingAddFunction] = React.useState(false);
  const [loadingForFavorite, setLoadingForFavorite] = React.useState(false);
  const [product, setProduct] = useState();
  const [currentProduct, setCurrentProduct] = useState();

  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const pathImage = process.env.PUBLIC_URL + "/img/jpg/shoes/";
  const [currentSize, setCurrentSize] = useState();
  const [error, setError] = useError();
  const [favorite, setFavorite] = useFavorite();

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const { data: { product } = {} } = await axios.post("fetch-product", {
        idProduct,
      });
      setProduct(product);
      setCurrentProduct(
        product?.colors.find((item) => item.color === colorProduct)
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const chooseSize = (e, size) => {
    document
      .querySelectorAll(".size")
      .forEach((x) => x.classList.remove("active"));
    e.target.classList.add("active");
    setCurrentSize(size);
  };
  const handleDeleteFavorite = async () => {
    setLoadingForFavorite(true);
    try {
      const res = await axios.post("delete-favorite", {
        userId: auth._id,
        product: {
          productId: product._id,
          color: currentProduct.color,
        },
      });
      setCart(res.data.products, "favorite");
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingForFavorite(false);
    }
  };

  const handleAddProductToCart = async () => {
    setLoadingAddFunction(true);
    if (!currentSize) {
      setError("Select size!");
    }
    try {
      const res = await axios.post(
        "add-product",
        {
          type: "cart",
          product: {
            productId: product._id,
            userId: auth._id,
            color: colorProduct,
            size: currentSize,
            quantity: 1,
          },
        },
        {
          headers: {
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token-data"))?.token
            }`,
            "Content-Type": "application/json",
          },
        }
      );
      setCart(res.data.products, "cart");
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingAddFunction(false);
    }
  };
  const handleAddFavorite = async () => {
    setLoadingForFavorite(true);
    try {
      const res = await axios.post(
        "add-product",
        {
          type: "favorite",
          product: {
            productId: product._id,
            userId: auth._id,
            color: colorProduct,
            size: currentSize ? Number(currentSize) : null,
          },
        },
        {
          headers: {
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token-data"))?.token
            }`,
            "Content-Type": "application/json",
          },
        }
      );
      setCart(res.data.products, "favorite");
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingForFavorite(false);
    }
  };

  return (
    <>
      {error ? <ErrorModal text={error} /> : null}
      <div className="container-shoe">
        {loading ? (
          <div className="responsive-desc">
            <div className="res-name">
              <Skeleton.Button active="active" block={false} />
            </div>
            <div className="res-gender">
              <Skeleton.Button active="active" block={false} />
            </div>
            <div className="res-price">
              <Skeleton.Button active="active" block={false} />
            </div>
            <div className="res-color">
              <Skeleton.Button active="active" block={false} />
            </div>
          </div>
        ) : (
          <div className="responsive-desc">
            <div className="res-name">product?.name</div>
            <div className="res-gender">
              {product?.gender}'s {product?.type}
            </div>
            <div className="res-price">Price: {product?.price}$</div>
            <div className="res-color">
              Current color: {currentProduct?.color}
            </div>
          </div>
        )}
        <div className="left-side">
          <div className="con-img">
            <div>
              {loading ? (
                <Skeleton.Image active="active" className="shapeImage" />
              ) : (
                <img
                  loading="lazy"
                  src={pathImage + currentProduct?.image}
                  alt="product"
                />
              )}
            </div>
            <div className="under-images">
              {loading
                ? [0, 0, 0].map((_, index) => (
                    <Skeleton.Image
                      key={index}
                      active="active"
                      className="shapeSmallImage"
                    />
                  ))
                : product?.colors.map((item, index) => (
                    <NavLink
                      to={`/product/${product._id}-${item.color}`}
                      key={index}
                    >
                      <img
                        loading="lazy"
                        src={pathImage + item.image}
                        alt="underimage"
                      />
                    </NavLink>
                  ))}
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="desc">
            <div className="name">
              {loading ? (
                <Skeleton.Button active="active" block={true} />
              ) : (
                product?.name
              )}
            </div>
            <div className="gender">
              {loading ? (
                <Skeleton.Button active="active" style={{ marginTop: 12 }} />
              ) : (
                `${product?.gender}'s ${product?.type}`
              )}
            </div>
            <div className="price">
              {loading ? (
                <Skeleton.Button
                  active="active"
                  style={{ marginTop: 12, width: "30%" }}
                  block={true}
                />
              ) : (
                `Price: ${product?.price}$`
              )}
            </div>
            <div className="color">
              {loading ? (
                <Skeleton.Button
                  active="active"
                  style={{ marginTop: 12, width: "20%" }}
                  block={true}
                />
              ) : (
                `Current color: ${currentProduct?.color}`
              )}
            </div>
          </div>
          <div className="description">
            {loading ? (
              <Skeleton.Button
                active="active"
                style={{ width: "100%", height: 150 }}
                block={true}
              />
            ) : (
              product?.description
            )}
          </div>
          <div className="size-box">
            {loading ? (
              <Skeleton.Button
                active="active"
                style={{ width: "100%" }}
                block={true}
              />
            ) : (
              <>
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
              </>
            )}
          </div>
          <div className="buttons">
            {loading ? (
              <Skeleton.Button
                active="active"
                style={{ width: "100%" }}
                block={true}
              />
            ) : (
              <>
                {loadingAddFunction ? (
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddProductToCart()}
                    disabled={loadingAddFunction}
                  >
                    <Spin indicator={antIcon} />
                  </button>
                ) : (
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddProductToCart()}
                    disabled={loadingAddFunction}
                  >
                    Add to cart <i className="bi bi-cart-fill"></i>
                  </button>
                )}
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
                        ? handleDeleteFavorite()
                        : setError("Sign in to add product to favorites!")
                    }
                  >
                    {loadingForFavorite ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <i className="bi bi-heart-fill"></i>
                    )}
                  </button>
                ) : (
                  <button
                    className="favorite"
                    onClick={() =>
                      auth
                        ? handleAddFavorite()
                        : setError("Sign in to add product to favorites!")
                    }
                  >
                    {loadingForFavorite ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <i className="bi bi-heart"></i>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
          <div className="more-information">
            <div className="size-chart">See size chart</div>
            <div className="product-details">See product details</div>
          </div>
          {loading ? (
            <Skeleton.Button
              active="active"
              style={{ width: "100%" }}
              block={true}
            />
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
}
