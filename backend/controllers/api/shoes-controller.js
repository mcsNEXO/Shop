const Shoes = require("../../db/models/shoes");

class ShoesController {
  async getShoes(req, res) {
    let shoes = await Shoes.find();
    const url = req.body.url;
    let colors = [];
    if (url.includes("?")) {
      url?.split("?").pop(0);
      if (url.includes("color")) {
        colors = url?.split("=")[1]?.split("%2C");
      }
      shoes = shoes
        .filter((product) => {
          return product.colors.some((color) =>
            colors.some((c) => c === color)
          );
        })
        .map((product) => product);
    }
    const filters = {
      colors: colors,
      // pice: price,
    };

    return res.status(200).json({ shoes, filters });
  }
}

module.exports = new ShoesController();
