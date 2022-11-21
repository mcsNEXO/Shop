import { useEffect, useState } from "react";
import "./Shoe.scss";
import { useParams } from "react-router-dom";
import axios from "../../../../../../axios";

export default function Shoe(props) {
  const { id } = useParams();
  const idProduct = id.split("-")[0];
  const index = id.split("-")[1];
  const [product, setProduct] = useState();
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await axios.post("fetch-product", { idProduct });
    setProduct(res.data.product);
  };

  return <div className="container-shoe"></div>;
}
