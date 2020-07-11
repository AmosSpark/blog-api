const User = require("../models/dbmodels/users_model");
const bcrypt = require("bcrypt");

// REGISTER NEW USER

exports.authUser_control = async (req, res) => {
  const request = {
    email: req.body.email,
    password: req.body.password,
  };

  let user = await User.findOne({ email: req.body.email });

  if (request) {
    //  validate
    if (!user) {
      return res.status(400).json({ status: "error, invalid email." });
    } else if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ status: "error, invalid password." });
    } else {
      const token = user.generateAuthToken();
      res.json(token);
    }
  } else {
    res.status(400).json({ status: "email and password required" });
  }
};
