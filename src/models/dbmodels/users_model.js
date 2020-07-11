const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const jwt = require("jsonwebtoken");
const config = require("config");

// SCHEMA

const usersSchema = new mongoose.Schema({
  _id: Number,
  user: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: function () {
      return this.user;
    },
    minlength: 5,
  },
  password: {
    type: String,
    required: function () {
      return this.password;
    },
    minlength: 8,
  },
  isAdmin: { type: Boolean },
});

// AUTO-INCREMENT PLUGIN

usersSchema.plugin(AutoIncrement, {
  id: "users_counter",
  inc_field: "_id",
});

// GENERATE AUTHENTICATION TOKEN

usersSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

// MODEL

const User = new mongoose.model("User", usersSchema);

module.exports = User;
