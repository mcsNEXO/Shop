const Shoe = require("../../db/models/shoes");
class ProductController {
  async fetchProduct(req, res) {
    try {
      const product = await Shoe.findOne({ _id: req.body.idProduct });
      return res.status(200).json({ product });
    } catch (e) {
      return res.status(402).json({ message: "Cannot find this product" });
    }
  }
  async fetchAllProduct(req, res) {
    try {
      const products = await Shoe.find();
      return res.status(200).json({ products });
    } catch (e) {
      return res.status(402).json({ message: "Something went wrong" });
    }
  }
}

module.exports = new ProductController();
