const Product = require("../../db/models/product");
class ShoesController {
  async getShoes(req, res) {
    const sortingData = req.body.sortingData;
    try {
      const shoes = await Product.aggregate([
        {
          $project: {
            _id: 1,
            name: 1,
            type: 1,
            colors: sortingData.colors
              ? {
                  $filter: {
                    input: "$colors",
                    as: "color",
                    cond: {
                      $in: ["$$color.color", sortingData.colors.split(",")],
                    },
                  },
                }
              : 1,
            price: 1,
            gender: 1,
            index: 1,
          },
        },
        {
          $match: {
            "colors.sizes": {
              $elemMatch: {
                size: {
                  $exists: true,
                },
              },
            },
            gender: sortingData.gender ? sortingData.gender : { $exists: true },
          },
        },
        {
          $sort: {
            price: sortingData.sort === "high-low" ? 1 : -1,
          },
        },
      ]);
      return res.status(200).json({ shoes });
    } catch (e) {
      return res.status(400).json({ message: "Cannot find any products" });
    }
  }
}

module.exports = new ShoesController();
