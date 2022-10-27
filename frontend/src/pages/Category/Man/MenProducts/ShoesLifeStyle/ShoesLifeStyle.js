import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import webPath from "../../../../../components/helpers/path";
import style from "./ShoesLifeStyle.module.css";

export default function MenShoesLifeStyle(props) {
  const [webLink, setWebLink] = useState();
  useEffect(() => {
    setWebLink(webPath());
  }, []);

  return (
    <div className={style.conLifestyle}>
      <div className={style.currentPathWeb}>{webLink}</div>
      <div className={style.filterBar}></div>
      <div className={style.content}>ds</div>
    </div>
  );
}
