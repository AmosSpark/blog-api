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

    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },

  { _id: false }
);

// AUTO-INCREMENT PLUGIN

postSchema.plugin(AutoIncrement, { id: "posts_counter", inc_field: "_id" });

// MODEL

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
