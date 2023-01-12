import React from "react";

const FilterHandlerContext = React.createContext({
  open: true,
  setOpen: () => {},
});

FilterHandlerContext.displayName = "FilterHandlerContext";

export default FilterHandlerContext;
