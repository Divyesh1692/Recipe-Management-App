const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  cuisine: { type: String, required: true },
  author: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
