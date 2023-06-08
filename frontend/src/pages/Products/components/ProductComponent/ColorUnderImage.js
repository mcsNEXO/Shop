import React from "react";

const ColorUnderImage = React.memo(
  ({ color, image, onMouseOver, selectedColor }) => (
    <div className={`box-img ${color === selectedColor ? "active" : ""}`}>
      <img
        onMouseOver={onMouseOver}
        src={process.env.PUBLIC_URL + "/img/jpg/shoes/" + image}
        alt={color}
      />
    </div>
  )
);

export default ColorUnderImage;
