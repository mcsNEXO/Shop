export const initialState = {
  user: JSON.parse(localStorage.getItem("token-data")) ?? null,
  cart: JSON.parse(localStorage.getItem("cart")) ?? null,
  open: JSON.parse(localStorage.getItem("openFilter")) ?? true,
  error: JSON.parse(localStorage.getItem("error") ?? null),
  favorite: JSON.parse(localStorage.getItem("favorite") ?? null),
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
    case "favorite":
      return { ...state, favorite: action.item };
    case "filter":
      return { ...state, open: action.value };
    case "error":
      return { ...state, error: action.error };
    default:
      throw new Error("This action does not exist: ".action.type);
  }
};
