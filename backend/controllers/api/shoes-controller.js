const Shoes = require("../../db/models/shoes");

class ShoesController {
  async getShoes(req, res) {
    let shoes = await Shoes.find();
    const url = req.body.url;
    let sort = "";
    let colors = [];
    if (url !== "") {
      if (url.sort) {
        sort = url.sort;
        switch (sort) {
          case "featured":
            break;
          case "newest":
            shoes = shoes?.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            });
            break;
          case "high-low":
            shoes?.sort(function (a, b) {
              return b.price - a.price;
            });
            break;
          case "low-high":
            shoes?.sort(function (a, b) {
              return a.price - b.price;
            });
            break;
          default:
        }
      }
      if (url.colors) {
        colors = url.colors.split(",");
        shoes = shoes
          .filter((product) => {
            return product.colors.some((color) =>
              colors.some((c) => c === color)
            );
          })
          .map((product) => product);
        shoes = shoes.filter((shoe) => {
          shoe.colors = shoe.colors.filter(
            (color) => colors.indexOf(color) >= 0
          );
          return (shoe.image = shoe.image.filter((image) =>
            shoe.colors.some((color) => image.includes(color))
          ));
        });
      }
    }
    const filters = {
      colors: colors,
      sort: sort,
    };
    return res.status(200).json({ shoes, filters });
  }
}

module.exports = new ShoesController();
