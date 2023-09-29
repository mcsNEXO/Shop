import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../axios";
import "./Products.scss";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import Filters from "../../components/Filters/Filters";
import ProductComponent from "./components/ProductComponent/ProductComponent";
import HeaderProducts from "./components/HeaderProducts/HeaderProducts";
import usePath from "../../hooks/usePath";
import { Skeleton } from "antd";

export default function Products() {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [search, setSearch] = useSearchParams();
  const { gender, type, category } = usePath();

  useEffect(() => {
    getProducts();
  }, [search, gender, type, category]);

  const getProducts = async () => {
    setLoading(true);
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
      console.log(res);
      return setProducts(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
            {loading
              ? [0, 0, 0].map((_, index) => (
                  <div className="box-product" key={index}>
                    <div className="main-img-product">
                      <Skeleton.Image
                        active={"active"}
                        style={{
                          borderRadius: 20,
                          width: "100%",
                          maxHeight: "370px",
                          height: "300px",
                        }}
                      />
                    </div>
                    <div className="description">
                      <div className="gender-product">
                        <Skeleton.Button
                          active={"active"}
                          size={"large"}
                          shape={"default"}
                          block={false}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="name-product">
                        <Skeleton.Button
                          active={"active"}
                          size={"default"}
                          shape={"default"}
                          block={false}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="price-product">
                        <Skeleton.Button
                          active={"active"}
                          size={"default"}
                          shape={"default"}
                          block={false}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="colors">
                        <Skeleton.Button
                          active={"active"}
                          size={"default"}
                          shape={"default"}
                          block={false}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              : products?.map((item, index) => (
                  <ProductComponent
                    key={index}
                    name={item.name}
                    colors={item.colors}
                    id={item._id}
                    type={item.type}
                    price={item.price}
                    gender={item.gender}
                    loading={loading}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
