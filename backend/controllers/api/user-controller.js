const User = require("../../db/models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

class UserController {
  async register(req, res) {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    try {
      await user.save();
    } catch (e) {
      if (e.code === 11000) {
        e.message = "This email exist";
      }

      return res.status(401).json({ message: [e.message] });
    }
    return res.status(200).json({ user });
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).send({ message: "Invalid Email or Password" });
      }
      const isValidPassword = user.comparePassword(req.body.password);
      if (!isValidPassword) {
        return res.status(401).send({ message: "Invalid Email or Password" });
      }
      // req.session.user = {
      // _id: user._id,
      // email: user.email,
      // };

      // const token = user.generateAuthToken();
      // const token = "dj";
      // const data = {
      //   user: req.session.user,
      //   token: token,
      // };
      return res.status(200).json({ user: user });
    } catch (e) {
      return res.status(401).json({ message: [e.message] });
    }
  }
}

module.exports = new UserController();
