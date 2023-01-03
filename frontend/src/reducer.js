import axios from "./axios";
import useAuth from "./hooks/useAuth";
const auth = JSON.parse(window.localStorage.getItem("token-data")) ?? null;

const x = async () => {
  const data = {
    userId: auth._id,
  };
  const res = await axios.post("get-product", data);
  window.localStorage.setItem("cart", JSON.stringify(res.data.cart));
  return res.data.cart;
};
x();
export const initialState = {
  user: JSON.parse(window.localStorage.getItem("token-data")) ?? null,
  cart: JSON.parse(window.localStorage.getItem("cart")) ?? null,
  error: JSON.parse(window.localStorage.getItem("error") ?? null),
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.user };
    case "logout":
      return { ...state, user: null };
    case "loading":
      return {};
    case "cart":
      return { ...state, cart: action.item };
    case "error":
      return { ...state, error: action.error };
    default:
      throw new Error("This action does not exist: ".action.type);
  }
};
