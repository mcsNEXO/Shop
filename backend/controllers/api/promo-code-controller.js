const PromoCode = require("../../db/models/promocode");

class PromoCodeController {
  async getCode(req, res) {
    const promocode = req.body.code;
    const codes = await PromoCode.find();
    codes.filter((item) => {
      if (item.promocode === promocode) {
        return res
          .status(200)
          .json({ promocode: item.promocode, precent: item.precent });
      } else {
        return res
          .status(200)
          .json({ message: "This promo code does not exist", precent: 0 });
      }
    });
  }
}

module.exports = new PromoCodeController();
