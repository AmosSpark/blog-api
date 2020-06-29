const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// SCHEMA

const CategoriesSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    description: String,
  },
  { _id: false }
);

// AUTO-INCREMENT PLUGIN

CategoriesSchema.plugin(AutoIncrement);

// MODEL

const Categorie = new mongoose.model("Categorie", CategoriesSchema);

module.exports = Categorie;
