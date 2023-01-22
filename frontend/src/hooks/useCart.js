import { useContext, useDebugValue } from "react";
import CartContext from "../context/cartContext";
import axios from "../axios";
import AuthContext from "../context/authContext";

export default function useCart() {
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);

  const cart = cartContext.item;
  const auth = authContext.user;

  const setCart = async (product) => {
    let newProduct;
    if (Array.isArray(product)) {
      cartContext.login(product);
      return localStorage.setItem("cart", JSON.stringify(product));
    }
    console.log('next')
    const index = window?.location.pathname.split("-").at(-1);
    if (!index.includes("/")) {
      newProduct = {
        ...product,
        colors: product.colors?.filter((x) => x === index).toString(),
        image: product.image?.filter((x) => x.includes(index)).toString(),
      };
    } else {
      newProduct = product;
    }
    console.log("new", newProduct);
    if (auth) {
      const data = {
        userId: auth._id,
        product: newProduct,
        type: "cart",
      };
      const res = await axios.post("add-product", data);
      cartContext.login(res.data.cart);
      localStorage.setItem("cart", JSON.stringify(res.data.cart));
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
