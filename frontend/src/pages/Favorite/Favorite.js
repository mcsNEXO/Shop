import "./Favorite.scss";
import useFavorite from "../../hooks/useFavorite";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import useAuth from "../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import SizeModal from "../../components/Modals/SizeModal/SizeModal.js";
import useCart from "../../hooks/useCart";

export default function Favorite(props) {
  //states
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [productForModal, setProductForModal] = useState(null);

  //hooks
  const [auth] = useAuth();
  const [favorite, setFavorite] = useFavorite();
  const [cart, setCart] = useCart();

  useEffect(() => {
    getFavoriteProducts();
  }, [JSON.stringify(favorite)]);

  const getFavoriteProducts = async () => {
    const res = await axios.post("get-user-products", {
      userId: auth._id,
      type: "favorite",
    });
    setFavoriteProducts(res.data.products);
  };

  const deleteFavProduct = async (product) => {
    try {
      const res = await axios.post("delete-favorite", {
        userId: auth._id,
        product: {
          productId: product.product._id,
          color: product.product.colors.color,
        },
      });
      setCart(res.data.products, "favorite");
    } catch (e) {
      console.log(e);
    }
  };

  const addProduct = async (product) => {
    if (product?.size) {
      try {
        const res = await axios.post("add-cart", {
          userId: auth._id,
          productId: product.productId,
          size: product.size,
          color: product.product.colors.color,
          quantity: 1,
        });
        setCart(res.data.products, "cart");
      } catch (e) {
        console.log(e);
      }
    } else {
      setProductForModal(product);
      setOpen(true);
    }
  };

  return (
    <>
      {open ? (
        <SizeModal
          product={productForModal}
          closeModal={() => setOpen(false)}
        />
      ) : null}
      <div className="container-favorite">
        <h2>Favorite</h2>
        <div className="products">
          {favoriteProducts?.length > 0 ? (
            favoriteProducts?.map((product, index) => (
              <div className="box-product" key={index}>
                <div className="icons">
                  <div className="icon" onClick={() => addProduct(product)}>
                    <div className="name-bag">
                      <span>
                        {product.size ? "Add to bag!" : "Select size!"}
                      </span>
                    </div>
                    <div className="add-icon">
                      <i className="bi bi-bag-plus"></i>
                    </div>
                  </div>
                  <div
                    className="icon"
                    onClick={() => deleteFavProduct(product)}
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </div>
                </div>
                <NavLink
                  to={`/product/${product.product._id}-${product.product.colors.color}`}
                  key={`${product.product._id}-${product.product.color}`}
                >
                  <div className="main-img-product">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/img/jpg/shoes/" +
                        product?.product.colors.image
                      }
                      alt="shoe"
                    />
                  </div>
                  <div className="description">
                    <div className="gender-product">
                      {`${product.product?.gender}'s ${product.product.type}`}
                    </div>
                    <div className="name-product">{product.product?.name}</div>
                    <div className="price-product">
                      ${product.product?.price}
                    </div>
                  </div>
                </NavLink>
              </div>
            ))
          ) : (
            <h3>You don't have any favorite products</h3>
          )}
        </div>
      </div>
    </>
  );
}
