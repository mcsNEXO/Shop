const Product = require("../../db/models/shoes");
class ShoesController {
  async getShoes(req, res) {
    const url = req.body.url;
    let shoes = await Product.find();
    if (url !== "") {
      shoes = await Product.aggregate([
        {
          $project: {
            _id: 1,
            name: 1,
            type: 1,
            colors: url.colors
              ? {
                  $setIntersection: ["$colors", url.colors?.split(",")],
                }
              : 1,
            price: 1,
            image: 1,
            size: url.size
              ? {
                  $setIntersection: [
                    "$size",
                    url.size?.split(",")?.map((el) => parseInt(el)),
                  ],
                }
              : 1,
            image: 1,
            gender: 1,
            index: 1,
            date: 1,
          },
        },
        {
          $match: {
            "colors.0": {
              $exists: true,
            },
            "size.0": {
              $exists: true,
            },
            gender: url.gender ? url.gender : { $exists: true },
          },
        },
        {
          $sort: {
            price: url.sort === "high-low" ? 1 : -1,
          },
        },
      ]);
    }
    return res.status(200).json({ shoes });
  }
}

module.exports = new ShoesController();
