export const initialState = {
  user: JSON.parse(window.localStorage.getItem("token-data")) ?? null,
  cart: JSON.parse(window.localStorage.getItem("cart")) ?? null,
  open: JSON.parse(window.localStorage.getItem("openFilter")) ?? true,
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
    case "filter":
      return { ...state, open: action.value };
    case "error":
      return { ...state, error: action.error };
    default:
      throw new Error("This action does not exist: ".action.type);
  }
};
