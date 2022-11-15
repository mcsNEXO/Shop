import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../../../axios";

export default function Shoe(props) {
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
  });

  const fetchProduct = async () => {
    const res = await axios.post("fetch-product", { id });
    console.log("res", res);
  };

  return <div className="container-shoe"></div>;
}
