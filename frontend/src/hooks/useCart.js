import { useContext, useDebugValue } from "react";
import CartContext from "../context/cartContext";

export default function useAuth() {
  const cartContext = useContext(CartContext);

  const cart = cartContext.item;

  const setCart = (item) => {
    if (item) {
      cartContext.login(item);
      localStorage.setItem("cart", JSON.stringify(item));
    }
  };
  return [cart, setCart];
}
