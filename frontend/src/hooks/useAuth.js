import { useContext, useDebugValue } from "react";
import AuthContext from "../context/authContext";
import useCart from "./useCart";
import useFavorite from "./useFavorite";
import axios from "../axios";

export default function useAuth() {
  const authContext = useContext(AuthContext);
  const [cart, setCart] = useCart();
  const [favorite, setFavorite] = useFavorite();
  const auth = authContext.user;
  useDebugValue(auth ? "Zalogowany" : "Wylogowany");

  const setAuth = async (user) => {
    if (user) {
      authContext.login(user);
      window.localStorage.setItem("token-data", JSON.stringify(user));
      let localUser = JSON.parse(window.localStorage.getItem("token-data"));
      const data = {
        userId: localUser._id,
      };
      const res = await axios.post("get-product", data);
      window.localStorage.setItem("cart", JSON.stringify(res.data.cart));
      setCart(res.data.cart);
      const res2 = await axios.post("get-fav-product", data);
      window.localStorage.setItem(
        "favorite",
        JSON.stringify(res2.data.products)
      );
      setFavorite(res2.data.products);
    } else {
      setCart([]);
      window.localStorage.removeItem("cart");
      window.localStorage.removeItem("favorite");
      window.localStorage.removeItem("token-data");
      authContext.logout();
    }
  };
  return [auth, setAuth];
}
