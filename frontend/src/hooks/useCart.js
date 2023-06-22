import { useContext } from "react";
import CartContext from "../context/cartContext";
import axios from "../axios";
import AuthContext from "../context/authContext";
import FavoriteContext from "../context/favoriteContext";

export default function useCart() {
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const favoriteContext = useContext(FavoriteContext);

  const cart = cartContext.item;
  const auth = authContext.user;

  const setCart = async (product, type) => {
    if (Array.isArray(product)) {
      if (type === "cart") {
        cartContext.login(product);
        return localStorage.setItem("cart", JSON.stringify(product));
      } else if (type === "favorite") {
        favoriteContext.setFavorite(product);
        return localStorage.setItem("favorite", JSON.stringify(product));
      }
    }
    if (auth && product !== null) {
      const addedProduct =
        type === "cart"
          ? {
              userId: auth._id,
              productId: product.productId,
              size: product.size,
              color: product.color,
              quantity: 1,
            }
          : {
              userId: auth._id,
              productId: product.productId,
              size: product.size,
              color: product.color,
            };
      const res = await axios.post(
        "add-product",
        type === "cart"
          ? { type: "cart", product: addedProduct }
          : { type: "favorite", product: addedProduct },
        {
          headers: {
            authorization: `Bearer ${
              JSON.parse(localStorage.getItem("token-data"))?.token
            }`,
            "Content-Type": "application/json",
          },
        }
      );
      if (type === "cart") {
        cartContext.login(res.data.products);
        localStorage.setItem("cart", JSON.stringify(res.data.products));
      } else if (type === "favorite") {
        favoriteContext.setFavorite(res.data.products);
        localStorage.setItem("favorite", JSON.stringify(res.data.products));
      }
    } else if (!auth) {
      if (type === "cart" && cart) {
        const exist = cart?.find(
          (x) =>
            x.productId?.toString() === product.productId &&
            x.color === product.color &&
            Number(x.size) === Number(product.size)
        );

        if (exist) {
          const newCart = cart.map((x) =>
            x.productId === product.productId &&
            x.size === Number(product.size) &&
            x.color === product.color
              ? { ...x, quantity: x.quantity + product.quantity }
              : x
          );
          cartContext.login(newCart);
          localStorage.setItem("cart", JSON.stringify(newCart));
        } else {
          const items = [...cart, product];
          cartContext.login(items);
          localStorage.setItem("cart", JSON.stringify(items));
        }
      } else {
        cartContext.login([product]);
        localStorage.setItem("cart", JSON.stringify([product]));
      }
    }
  };

  return [cart, setCart];
}
