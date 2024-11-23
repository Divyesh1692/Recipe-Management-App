const Recipe = require("../models/recipeSchema");

const allRecipe = async (req, res) => {
  try {
    let recipes = await Recipe.find({});
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "error retrieving recipes" });
  }
};

const getRecipeById = async (req, res) => {
  try {
    let { id } = req.params;
    let recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "error retrieving recipe" });
  }
};

const createRecipe = async (req, res) => {
  try {
    let { title, ingredients, instructions, cuisine } = req.body;

    let author = req.user.username;

    let recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      cuisine,
      author,
    });
    res.status(201).json(recipe);
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "error creating recipe" });
  }
};

const updateRecipe = async (req, res) => {
  try {
    let { id } = req.params;
    let recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "recipe not found" });
    }
    if (recipe.author == req.user.username) {
      let updatedRecipe = await Recipe.findByIdAndUpdate(
        id,
        { ...req.body, updatedAt: Date.now() },
        {
          new: true,
        }
      );
      res
        .status(200)
        .json({ message: "recipe updated!!!", updateRecipe: updatedRecipe });
    } else {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this recipe" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "error updating recipe" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    let { id } = req.params;
    let recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "recipe not found" });
    }
    if (recipe.author == req.user.username) {
      await Recipe.findByIdAndDelete(id);
      res.status(200).json({ message: "recipe deleted!!!" });
    } else {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this recipe" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, message: "error deleting recipe" });
  }
};

const searchRecipe = async (req, res) => {
  try {
    const { title, author, cuisine } = req.query;

    let filters = {};
    if (title) {
      filters.title = { $regex: title, $options: "i" };
    }
    if (author) {
      filters.ingredients = { $regex: author, $options: "i" };
    }
    if (cuisine) {
      filters.cuisine = { $regex: cuisine, $options: "i" };
    }

    const recipes = await Recipe.find(filters).sort({ updatedAt: -1 });

    if (recipes.length == 0) {
      return res
        .status(404)
        .json({ message: "No recipes found matching your criteria." });
    }

    res.status(200).json({ message: "Recipes found", recipes });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while searching for recipes",
      error: error.message,
    });
  }
};

module.exports = {
  getRecipeById,
  deleteRecipe,
  updateRecipe,
  createRecipe,
  allRecipe,
  searchRecipe,
};
