const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// SCHEMA

const commentsSchema = new mongoose.Schema(
  {
    _id: Number,
    user: String,
    comment: String,
    date: Date,
    time: Number,
  },
  { _id: false }
);

// AUTO-INCREMENT PLUGIN

commentsSchema.plugin(AutoIncrement);

// MODEL

const Comment = new mongoose.model("Comment", commentsSchema);

module.exports = Comment;
