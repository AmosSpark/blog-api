const mongoose = require("mongoose");

// SCHEMA

const CategoriesSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
});

// MODEL

const Categorie = new mongoose.model("Categorie", CategoriesSchema);

module.exports = Categorie;
