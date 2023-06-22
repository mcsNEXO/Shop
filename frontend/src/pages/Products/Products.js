import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../axios";
import "./Products.scss";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import Filters from "../../components/Filters/Filters";
import ProductComponent from "./components/ProductComponent/ProductComponent";
import HeaderProducts from "./components/HeaderProducts/HeaderProducts";
import usePath from "../../hooks/usePath";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [search, setSearch] = useSearchParams();
  const { gender, type, category } = usePath();

  useEffect(() => {
    getProducts();
  }, [search, gender, type, category]);

  const getProducts = async () => {
    const sortingData = {
      colors: search.get("colors"),
      sort: search.get("sort"),
      price: search.get("price"),
      size: search.get("size"),
      gender: gender,
      type: type,
      category: category,
    };
    try {
      const res = await axios.post("get-shoes", { sortingData });
      return setProducts(res.data.shoes);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {error ? <ErrorModal text={error} closeModal={() => setError()} /> : null}
      <div className="conLifestyle">
        <HeaderProducts />
        <div className="con-content">
          <Filters productsLength={products?.length} />
          <div className="contents">
            {products?.map((item, index) => (
              <ProductComponent
                key={index}
                name={item.name}
                colors={item.colors}
                id={item._id}
                type={item.type}
                price={item.price}
                gender={item.gender}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
