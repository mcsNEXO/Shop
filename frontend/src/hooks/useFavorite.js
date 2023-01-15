import { useContext } from "react";
import FavoriteContext from "../context/favoriteContext";
import axios from "../axios";
import AuthContext from "../context/authContext";

export default function useFavorite() {
  const favoriteContext = useContext(FavoriteContext);
  const auth = useContext(AuthContext).user;

  const favorite = favoriteContext.item;

  const setFavorite = async (product) => {
    if (Array.isArray(product)) {
      favoriteContext.setFavorite(product);
      return localStorage.setItem("favorite", JSON.stringify(product));
    }
    const index = window.location.pathname.split("-").at(-1);
    const newProduct = {
      ...product,
      colors: product.colors?.filter((x) => x === index).toString(),
      image: product.image?.filter((x) => x.includes(index)).toString(),
    };
    const data = {
      userId: auth._id,
      product: newProduct,
      type: "favorite",
    };
    const res = await axios.post("add-product", data);
    favoriteContext.setFavorite(res.data.cart);
    localStorage.setItem("favorite", JSON.stringify(res.data.cart));
  };
  return [favorite, setFavorite];
}
