import { React, useState, useEffect, useMemo } from "react";
import { Checkbox, Input, Select, InputNumber, Tag, Button, Modal } from "antd";
import axios from "../../../axios";
import {
  bigKidsSize,
  smallKidsSize,
  womanSize,
  manSize,
  genderOptions,
  typeClothes,
} from "../../../data/sizeShoes";
import { colorsData } from "../../../data/sizeShoes";
import "./AddProduct.scss";

export default function AddProduct(props) {
  const [name, setName] = useState("");
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
    const data = { name, type, price, gender, size };
    try {
      const res = await axios.post("add-product-db", data);
      setLoading(false);
      return success();
    } catch (err) {
      error(err.response.data.message);
    }
  };

  const handleSizeOptions = useMemo(() => {
    const handleSizeOptions = (genderValue) => {
      if (!type) {
        return "Select type";
      } else if (type === "shoes") {
        switch (genderValue) {
          case "man":
            return setSizeOptions(manSize);
          case "woman":
            return setSizeOptions(womanSize);
          case "bigKids":
            return setSizeOptions(bigKidsSize);
          case "smallKids":
            return setSizeOptions(smallKidsSize);
          default:
            return "Select gender";
        }
      } else if (type === "hoddies") {
        return setSizeOptions(["S", "M", "L", "XL", "XLL"]);
      }
    };

    return handleSizeOptions;
  }, [type, gender]);

  const handleColorChange = (value) => {
    setColors(value);
    setSize((prevSize) =>
      value.map((color) => {
        const existingSize = prevSize.find((item) => item.color === color);
        return existingSize || { color, sizes: [] };
      })
    );
  };

  const handleSizeChange = (color, sizes) => {
    setSize((prevSize) =>
      prevSize.map((item) =>
        item.color === color
          ? {
              ...item,
              sizes: sizes.map((nextItem) => {
                const exist = item.sizes.find((next) => next.size === nextItem);
                return exist || { size: nextItem, quantity: 0 };
              }),
            }
          : item
      )
    );
  };

  const handleQuantity = (color, oneSize, quantity) => {
    setSize((prevSize) =>
      prevSize.map((item) =>
        item.color === color
          ? {
              ...item,
              sizes: item.sizes.map((nextItem) =>
                nextItem.size === oneSize
                  ? { ...nextItem, quantity: quantity }
                  : nextItem
              ),
            }
          : item
      )
    );
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <div className="group price-input">
            <label htmlFor="price">Price</label>
            <InputNumber
              className="input-number"
              id="price"
              addonAfter="$"
              value={price}
              onChange={(value) => setPrice(value)}
              defaultValue={100}
            />
          </div>

          <div className="group colors-checkbox">
            <label>Colors</label>
            <Select
              mode="multiple"
              allowClear
              className="select"
              placeholder="Select colors"
              onChange={handleColorChange}
              options={colorsData}
            />
          </div>

          <div className="group size-select">
            <label htmlFor={colors[0] ?? ""}>Sizes</label>
            {!gender || !type || colors.length === 0 ? (
              <Tag color="#cd201f" style={{ fontSize: "0.95rem" }}>
                Select gender & type & colors
              </Tag>
            ) : (
              <div className="sizes-for-color">
                {colors.map((color) => (
                  <div className="color-size-container" key={color}>
                    <label htmlFor={color} className="small-label bold">
                      Size: {color}
                    </label>
                    <Select
                      mode="multiple"
                      allowClear
                      id={color}
                      className="select"
                      placeholder="Select sizes"
                      onChange={(sizes) => handleSizeChange(color, sizes)}
                      options={sizeOptions}
                    />
                    {size?.map((item) => {
                      return (
                        item.color === color &&
                        item.sizes.map((oneSize, index) => (
                          <div
                            className="sizes-for-color  color-margin"
                            key={index}
                          >
                            <label htmlFor="quantity" className="small-label">
                              Quantity: {oneSize.size}
                            </label>
                            <InputNumber
                              className="select-pad"
                              id="quantity"
                              value={oneSize.quantity}
                              onChange={(qnt) =>
                                handleQuantity(color, oneSize.size, qnt)
                              }
                              defaultValue={0}
                            />
                          </div>
                        ))
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="btn-andt">
            <Button
              loading={loading}
              style={{ width: "100%" }}
              type="primary"
              size={"middle"}
              disabled={
                name === "" ||
                type === "" ||
                gender === "" ||
                colors.length === 0 ||
                price === null ||
                size.some((x) => x.sizes.length === 0)
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
