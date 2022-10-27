import { useEffect, useState } from "react";
import webPath from "../../../../../components/helpers/path";

export default function ShoesRunning(props) {
  const [webLink, setWebLink] = useState();
  useEffect(() => {
    setWebLink(webPath());
  }, []);
  return <div>{webLink}</div>;
}
