const User = require("../../db/models/user");
const bcrypt = require("bcrypt");

class UserController {
  async showUsers(req, res) {
    let doc;
    try {
      doc = await User.find({});
      // console.log(res);
    } catch (e) {
      return res.status(422).json({ message: e.message });
    }
    res.status(200).json(doc);
  }
  async getUser(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({
        email: email,
        password: password,
      });
      if (!user || user === null) {
        throw new Error("The login, e-mail or password is incorrect");
      }
      return res.status(220).json(true);
    } catch (e) {
      return res.status(401).json({ message: [e.message] });
    }
  }
  async register(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      await user.save();
    } catch (e) {}
  }
}

module.exports = new UserController();
