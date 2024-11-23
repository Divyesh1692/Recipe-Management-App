const { Router } = require("express");
const {
  allRecipe,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipe,
} = require("../controllers/recipeController");
const validate = require("../middlewares/auth");

const recipeRouter = Router();

recipeRouter.get("/", allRecipe);
recipeRouter.get("/get/:id", getRecipeById);
recipeRouter.get("/search", searchRecipe);
recipeRouter.post("/create", validate, createRecipe);
recipeRouter.patch("/update/:id", validate, updateRecipe);
recipeRouter.delete("/delete/:id", validate, deleteRecipe);

module.exports = recipeRouter;
