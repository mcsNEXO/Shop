import { React, useState, useEffect } from "react";
import { Checkbox, Input, Select, InputNumber, Tag, Button, Modal } from "antd";
import axios from "../../../axios";
import {
  bigKidsSize,
  smallKidsSize,
  womenSize,
  menSize,
  genderOptions,
  typeClothes,
} from "../../../data/sizeShoes";
import { colorsData } from "../../../data/sizeShoes";
import "./AddProduct.scss";

export default function AddProduct(props) {
  const [nameProduct, setNameProduct] = useState("");
  const [type, setType] = useState(
    typeClothes.length > 1 ? "" : typeClothes[0].value
  );
  const [colors, setColors] = useState([]);
  const [price, setPrice] = useState(100);
  const [gender, setGender] = useState("");
  const [sizeOptions, setSizeOptions] = useState([]);
  const [size, setSize] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    handleSizeOptions(gender);
  }, [type]);

  const error = (text) => {
    Modal.error({
      title: "Error",
      content: text,
      afterClose: () => setLoading(false),
    });
  };

  const success = () => {
    Modal.success({
      content: "Success",
    });
  };

  const addProduct = async () => {
    setLoading(true);
    const data = { nameProduct, type, colors, price, gender, size };
    try {
      const res = await axios.post("add-product-db", data);
      setLoading(false);
      return success();
    } catch (err) {
      error(err.response.data.message);
    }
  };

  const handleSizeOptions = (genderValue) => {
    if (!type) {
      return "Select type";
    } else if (type === "shoes") {
      switch (genderValue) {
        case "man":
          return setSizeOptions(menSize);
        case "woman":
          return setSizeOptions(womenSize);
        case "bigKids":
          return setSizeOptions(bigKidsSize);
        case "smallKids":
          return setSizeOptions(smallKidsSize);
        case "":
          return "Select gender";
        default:
          return "Select gender";
      }
    } else if (type === "hoddies") {
      return setSizeOptions(["S", "M", "L", "XL", "XLL"]);
    }
  };

  return (
    <>
      <div className="con-add-product">
        <form>
          <h2>Add new product</h2>
          <div className="group name-input">
            <label htmlFor="name">Name</label>
            <Input
              className="input-name-product"
              type="text"
              id="name"
              value={nameProduct}
              onChange={(e) => setNameProduct(e.target.value)}
              placeholder="Name Product"
            />
          </div>
          <div className="group type-select">
            <label htmlFor="type">Type</label>
            <Select
              defaultValue={
                typeClothes.length > 1 ? "Select type" : typeClothes[0].value
              }
              options={typeClothes}
              className={"select"}
              id="type"
              onChange={(value) => setType(value)}
            />
          </div>
          <div className="group gender-select">
            <label htmlFor="gender">Gender</label>
            <Select
              defaultValue={
                genderOptions.length > 1
                  ? "Select gender"
                  : genderOptions[0].value
              }
              options={genderOptions}
              className={"select"}
              id="gender"
              onChange={(value) => {
                setGender(value);
                handleSizeOptions(value);
              }}
            />
          </div>
          <div className="group colors-checkbox">
            <label>Colors</label>
            <Checkbox.Group
              className="checkbox-flex"
              options={colorsData}
              onChange={(value) => setColors(value)}
            />
          </div>
          <div className="group price-input">
            <label htmlFor="price" onClick={() => console.log(price)}>
              Price
            </label>
            <InputNumber
              className="input-number"
              id="price"
              addonAfter="$"
              value={price}
              onChange={(value) => setPrice(value)}
              defaultValue={100}
            />
          </div>
          <div className="group size-select">
            <label htmlFor="size">Size</label>
            {!gender || !type ? (
              <Tag color="#cd201f" style={{ fontSize: "0.95rem" }}>
                Select gender & type
              </Tag>
            ) : (
              <Checkbox.Group
                id="size"
                className="checkbox-flex"
                options={sizeOptions}
                onChange={(value) => setSize(value)}
              />
            )}
          </div>
          <div className="btn-andt">
            <Button
              loading={loading}
              style={{ width: "100%" }}
              type="primary"
              size={"middle"}
              disabled={
                nameProduct === "" ||
                type === "" ||
                gender === "" ||
                colors.length === 0 ||
                price === null ||
                size.length === 0
                  ? true
                  : false
              }
              onClick={addProduct}
            >
              Add product
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
