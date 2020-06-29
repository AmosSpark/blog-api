const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// SCHEMA

const draftsSchema = new mongoose.Schema({
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

  category: { type: String, required: true, minlength: 3 },

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
});

// AUTO-INCREMENT PLUGIN

draftsSchema.plugin(AutoIncrement);

// MODEL

const Draft = new mongoose.model("Draft", draftsSchema);

module.exports = Draft;
