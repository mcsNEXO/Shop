import React from "react";

const CartContext = React.createContext({
  item: false,
  login: () => {},
});

CartContext.displayName = "CartContext";

export default CartContext;
