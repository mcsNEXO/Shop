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
      <div className="key" key={indexItem}>
        <div className="path-link" key={indexItem}>
          <NavLink key={indexItem} to={`/w/${x}`}>
            {item}
          </NavLink>
          <span>
            {`${indexItem < pathArray.length - 1 ? " >" : ""}`}
            &nbsp;
          </span>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="currentPathWeb">{x}</div>
      <div className="current-title">
        {window.location.pathname.split("/")[2].replaceAll("-", " ")}
      </div>
    </>
  );
}
