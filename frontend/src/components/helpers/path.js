import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function webPath() {
  const pathArray = window.location.pathname.split("/")[2].split("-");
  const x = pathArray.map((item) => {
    const indexItem = pathArray.indexOf(item);
    const x = pathArray
      .slice(0, indexItem + 1)
      .toString()
      .replaceAll(",", "-");
    return (
      <NavLink key={indexItem} to={`/w/${x}`}>
        {item}
      </NavLink>
    );
  });
  return x;
}
