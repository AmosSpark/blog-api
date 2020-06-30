const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// SCHEMA

const postSchema = new mongoose.Schema(
  {
    _id: Number,

    title: { type: String, required: true },

    description: {
      type: String,
      required: function () {
        return this.title;
      },
    },

    author: {
      type: String,
      required: function () {
        return this.description;
      },
    },

    category: {
      type: String,
      required: function () {
        return this.author;
      },
    },

    tags: { type: [String] },

    image: { type: String },

    date: {
      type: Date,
      default: Date.now,
      required: function () {
        return this.category;
      },
    },
  },

  { _id: false }
);

// AUTO-INCREMENT PLUGIN

postSchema.plugin(AutoIncrement, { id: "posts_counter", inc_field: "_id" });

// MODEL

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
