import React from "react";

const FavoriteContext = React.createContext({
  item: false,
  setFavorite: () => {},
});

FavoriteContext.displayName = "FavoriteContext";

export default FavoriteContext;
