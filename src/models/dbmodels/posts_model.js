const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// SCHEMA

const postSchema = new mongoose.Schema(
  {
    _id: Number,

    title: { type: String, required: true, minlength: 5 },

    description: {
      type: String,
      required: function () {
        return this.title;
      },
      minlength: 10,
    },

    author: {
      type: String,
      required: function () {
        return this.description;
      },
      minlength: 5,
    },

    category: String,

    tags: { type: [String], minlength: 3 },

    image: { type: String },

    date: {
      type: Date,
      required: function () {
        return this.author;
      },
    },

    time: {
      type: Number,
      required: function () {
        return this.date;
      },
    },
  },
  { _id: false }
);

postSchema.plugin(AutoIncrement);

// MODEL

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
