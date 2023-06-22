import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MainImage from "./MainImage";
import ColorUnderImage from "./ColorUnderImage";

const ProductComponent = ({ id, type, gender, name, colors, price }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.color);
  const [showThumbnails, setShowThumbnails] = useState(false);

  const handleThumbnailMouseOver = (color) => {
    setSelectedColor(color);
  };

  const handleMainImageMouseOver = () => {
    setShowThumbnails(true);
  };

  const handleMainImageMouseOut = () => {
    setShowThumbnails(false);
  };

  return (
    <NavLink
      to={`/product/${id}-${selectedColor}`}
      className={"box-product"}
      onPointerOver={handleMainImageMouseOver}
      onPointerOut={handleMainImageMouseOut}
    >
      <MainImage selectedColor={selectedColor} colors={colors} />
      <div className={` ${showThumbnails ? "show" : "hide"}`}>
        <div className="con-imgs">
          {colors.map((color) => (
            <ColorUnderImage
              key={color.color}
              color={color.color}
              image={color.image}
              onMouseOver={() => handleThumbnailMouseOver(color.color)}
              selectedColor={selectedColor}
            />
          ))}
        </div>
      </div>
      <div className="description">
        <div className="gender-product">
          {`${gender}'s`} {type}
        </div>
        <div className="name-product">{name}</div>
        <div className="price-product">${price}</div>
        <div className="colors">
          {colors.length > 1 ? `${colors.length} colors` : `1 color`}
        </div>
      </div>
    </NavLink>
  );
};

export default ProductComponent;
