import { React, useState, useEffect } from "react";
import { Checkbox, Input, Select, InputNumber, Tag, Button } from "antd";
import axios from "../../../axios";

import "./AddProduct.scss";

export default function AddProduct(props) {
  const [nameProduct, setNameProduct] = useState("");
  const [type, setType] = useState("");
  const [colors, setColors] = useState([]);
  const [price, setPrice] = useState(100);
  const [gender, setGender] = useState("");
  const [sizeOptions, setSizeOptions] = useState([]);
  const [size, setSize] = useState([]);

  const addProduct = async () => {
    const data = { nameProduct, type, colors, price, gender, size };
    const res = await axios.post("add-product", data);
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
    } else if (type === "clothes") {
      return setSizeOptions(["S", "M", "L", "XL", "XLL"]);
    }
  };
  useEffect(() => {
    handleSizeOptions(gender);
  }, [type]);
  const options = [
    { label: "shoes", value: "shoes" },
    { label: "clothes", value: "clothes" },
  ];

  const genderOptions = [
    { label: "man", value: "man" },
    { label: "woman", value: "woman" },
    { label: "big kids", value: "bigKids" },
    { label: "small kids", value: "smallKids" },
  ];
  const colorsOptions = ["white", "black", "gray", "red"];

  const bigKidsSize = [35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39];
  const smallKidsSize = [
    27, 28, 29, 30, 30.5, 31, 31.5, 32, 32.5, 33, 33.5, 34,
  ];
  const menSize = [40, 41, 42, 43, 44, 45, 46, 47, 48];
  const womenSize = [40, 41, 42, 43, 44, 45, 46, 47, 48];

  return (
    <div className="con-add-product">
      <form>
        <div className="group name-input">
          <label htmlFor="name">Name</label>
          <Input
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
            defaultValue={options.length > 1 ? "Select type" : options[0].value}
            options={options}
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
            options={colorsOptions}
            onChange={(value) => setColors(value)}
          />
        </div>
        <div className="group price-input">
          <label htmlFor="price" onClick={() => console.log(price)}>
            Price
          </label>
          <InputNumber
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
            <Tag color="#cd201f">Select gender & type</Tag>
          ) : (
            <Checkbox.Group
              id="size"
              options={sizeOptions}
              onChange={(value) => setSize(value)}
            />
          )}
        </div>
        <Button
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
      </form>
    </div>
  );
}
