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
      localStorage.setItem("token-data", JSON.stringify(user));
      let localUser = JSON.parse(localStorage.getItem("token-data"));
      const data = {
        userId: localUser._id,
      };
      const res = await axios.post("get-product", data);
      localStorage.setItem("cart", JSON.stringify(res.data.products));
      setCart(res.data.products, "cart");
      const res2 = await axios.post("get-fav-product", data);
      localStorage.setItem("favorite", JSON.stringify(res2.data.products));
      setCart(res2.data.products, "favorite");
    } else {
      setCart([], "cart");
      setCart([], "favorite");
      localStorage.removeItem("cart");
      localStorage.removeItem("favorite");
      localStorage.removeItem("token-data");
      authContext.logout();
    }
  };
  return [auth, setAuth];
}
