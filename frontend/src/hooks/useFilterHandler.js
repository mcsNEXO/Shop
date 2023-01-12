import { useContext } from "react";
import FilterHandlerContext from "../context/filterHandlerContext";
export default function useFilterHandler() {
  const filterHandlerContext = useContext(FilterHandlerContext);
  const open = filterHandlerContext.open;

  const setOpen = (value) => {
    if (value) {
      filterHandlerContext.setOpen(true);
      window.localStorage.setItem("openFilter", true);
    } else {
      filterHandlerContext.setOpen(false);
      window.localStorage.setItem("openFilter", false);
    }
  };

  return [open, setOpen];
}
