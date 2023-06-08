import React from "react";

const MainImage = React.memo(({ selectedColor, colors }) => {
  function getImageForColor(colors, selectedColor) {
    const selectedColorObj = colors.find(
      (color) => color.color === selectedColor
    );
    if (selectedColorObj) {
      return (
        process.env.PUBLIC_URL + "/img/jpg/shoes/" + selectedColorObj.image
      );
    }
    return process.env.PUBLIC_URL + "/img/jpg/shoes/" + colors[0].image;
  }
  const image = getImageForColor(colors, selectedColor);
  return (
    <div className="main-img-product">
      <img src={image} alt="product" />
    </div>
  );
});

export default MainImage;
