const { copyFileSync } = require("fs");
const Shoes = require("../../db/models/shoes");
class ShoesController {
  async getShoes(req, res) {
    let shoes = await Shoes.find();
    const url = req.body.url;
    if (url !== "") {
      if (url.sort) {
        const sort = url.sort;
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
        const colors = url.colors.split(",");
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
      if (url.price) {
        const minAmount = url.price.split("-")[0];
        const maxAmount = url.price.split("-")[1];
        shoes = shoes.filter(
          (shoe) => shoe.price >= minAmount && shoe.price <= maxAmount
        );
      }
      if (url.size) {
        shoes = shoes.filter((shoe) => shoe.size.includes(Number(url.size)));
        console.log(shoes);
      }
    }
    return res.status(200).json({ shoes });
  }
}

module.exports = new ShoesController();
