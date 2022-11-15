const Shoe = require("../../db/models/shoes");

class ProductController {
  async fetchProduct(req, res) {
    try {
      const product = await Shoe.findOne({ _id: req.body.id });
      console.log("product", product);
      return res.status(200).json({ product });
    } catch (e) {
      return res.status(402).json({ message: "Cannot find this product" });
    }
  }
}

module.exports = new ProductController();
