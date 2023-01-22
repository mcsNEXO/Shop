import "./Favorite.scss";
import useFavorite from "../../hooks/useFavorite";
import { NavLink } from "react-router-dom";
import axios from "../../axios";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import SizeModal from "../../components/Modals/SizeModal/SizeModal.js";
import useCart from "../../hooks/useCart";

export default function Favorite(props) {
  const [favorite, setFavorite] = useFavorite();
  const [auth] = useAuth();
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState("");

  const deleteFavProduct = async (product) => {
    const data = {
      userId: auth._id,
      product: product,
    };
    const res = await axios.post("delete-favorite", data);
    setFavorite(res.data.newFavorites);
  };

  const addProduct = async (product) => {
    if (!Array.isArray(product.size)) {
      return setCart(product);
    } else {
      setProduct(product);
      setOpen(true);
    }
  };

  return (
    <>
      {open ? <SizeModal product={product} setOpen={setOpen} /> : null}
      <div className="container-favorite">
        <h2>Favorite</h2>
        <div className="products">
          {favorite?.map((product, index) => (
            <div className="box-product" key={index}>
              <div className="icons">
                <div className="icon" onClick={() => addProduct(product)}>
                  <i className="bi bi-bag-plus"></i>
                </div>
                <div className="icon" onClick={() => deleteFavProduct(product)}>
                  <i className="bi bi-trash3-fill"></i>
                </div>
              </div>
              <NavLink
                to={`/product/${product._id}-${product.colors}`}
                key={`${product._id}-${index}`}
              >
                <div className="main-img-product">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/img/jpg/shoes/" +
                      product?.image
                    }
                    alt="shoe"
                  />
                </div>
                <div className="description">
                  <div className="gender-product">
                    {product?.gender === "man"
                      ? `${product?.gender}'s shoes`
                      : `${product?.gender}'s shoes`}
                  </div>
                  <div className="name-product">{product?.name}</div>
                  <div className="price-product">${product?.price}</div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
