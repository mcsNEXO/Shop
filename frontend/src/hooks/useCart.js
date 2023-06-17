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
  const favorite = favoriteContext.item;

  const setCart = async (product, type) => {
    let newProduct;
    if (Array.isArray(product)) {
      if (type === "cart") {
        cartContext.login(product);
        return localStorage.setItem("cart", JSON.stringify(product));
      } else if (type === "favorite") {
        favoriteContext.setFavorite(product);
        return localStorage.setItem("favorite", JSON.stringify(product));
      }
    }
    if (auth) {
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
          : { type: "favorite", product: addedProduct }
      );
      if (type === "cart") {
        cartContext.login(res.data.products);
        localStorage.setItem("cart", JSON.stringify(res.data.products));
      } else if (type === "favorite") {
        favoriteContext.setFavorite(res.data.products);
        localStorage.setItem("favorite", JSON.stringify(res.data.products));
      }
    } else if (!auth) {
      if (cart) {
        const exist = cart?.find(
          (x) =>
            x._id === newProduct._id &&
            x.colors === newProduct.colors &&
            x.size === newProduct.size
        );
        if (exist) {
          const newCart = cart.map((x) =>
            x._id === newProduct._id && x.size === newProduct.size
              ? { ...x, quantity: x.quantity + 1 }
              : x
          );
          cartContext.login(newCart);
          localStorage.setItem("cart", JSON.stringify(newCart));
        } else {
          const items = [...cart, { ...newProduct, quantity: 1 }];
          cartContext.login(items);
          localStorage.setItem("cart", JSON.stringify(items));
        }
      } else {
        cartContext.login([{ ...newProduct, quantity: 1 }]);
        localStorage.setItem(
          "cart",
          JSON.stringify([{ ...newProduct, quantity: 1 }])
        );
      }
    }
  };

  return [cart, setCart];
}
