const bcrypt = require("bcrypt");
const User = require("../models/dbmodels/users_model");

// REGISTER NEW USER

exports.registerNewUser_control = async (req, res) => {
  const newUser = new User({
    _id: req.body._id,
    user: req.body.user,
    email: req.body.email,
    password: req.body.password,
  });

  const findUserEmail = await User.findOne({ email: req.body.email });
  //  validate
  if (newUser) {
    if (findUserEmail) {
      res.status(400).json({ status: "error, user already registered." });
    } else {
      // hash password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      // save
      const user = await newUser.save();
      const token = user.generateAuthToken();
      res.header("x-auth-token", token).json({
        status: true,
        _id: req.body._id,
        user: req.body.user,
        email: req.body.email,
      });
    }
  } else {
    res
      .status(400)
      .json({ status: "false, user, email and password required" });
  }
};

// GET A USER

exports.getAUser_control = async (req, res) => {
  const user = await User.findById(req.user._id).select({ password: 0 });
  res.json(user);
};
