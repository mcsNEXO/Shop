const User = require("../../db/models/user");

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

      const token = user.generateAuthToken(user._id);

      return res.status(200).json({ user: user, token });
    } catch (e) {
      return res.status(401).json({ message: [e.message] });
    }
  }
  async edit(req, res) {
    console.log(req);
    const user = await User.findById(req.body.userId);
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    try {
      user.save();
      return res.status(200).json({ user: user });
    } catch (e) {
      return res.status(402).json("Something went wrong");
    }
  }
}

module.exports = new UserController();
