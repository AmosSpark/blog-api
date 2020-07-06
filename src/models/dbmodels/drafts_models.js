const mongoose = require("mongoose");
const moment = require("moment");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// SCHEMA

const draftsSchema = new mongoose.Schema(
  {
    _id: Number,

    title: { type: String, required: true },

    description: {
      type: String,
      required: function () {
        return this.title;
      },
    },

    body: {
      type: String,
      required: function () {
        return this.description;
      },
    },

    author: {
      type: String,
      required: function () {
        return this.body;
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
      type: String, // type Date not working with momment js
      default: () => moment().format("LLL"),
      required: function () {
        return this.category;
      },
    },
  },

  { _id: false }
);

// AUTO-INCREMENT PLUGIN

draftsSchema.plugin(AutoIncrement, { id: "drafts_counter", inc_field: "_id" });

// MODEL

const Draft = new mongoose.model("Draft", draftsSchema);

module.exports = Draft;
