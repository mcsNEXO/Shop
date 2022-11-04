const Shoes = require("../../db/models/shoes");

class ShoesController {
  async getShoes(req, res) {
    const shoes = await Shoes.find();
    return res.status(200).json({ shoes });
  }
}

module.exports = new ShoesController();
