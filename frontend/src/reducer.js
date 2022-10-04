export const initialState = {
  user: JSON.parse(window.localStorage.getItem("token-data")) ?? null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.user };
    case "logout":
      return { ...state, user: null };
    case "loading":
      return {};
    default:
      throw new Error("This action does not exist: ".action.type);
  }
};
