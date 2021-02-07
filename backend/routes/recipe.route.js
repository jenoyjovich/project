const route = require("express").Router();
const _ = require("lodash");
const auth = require("../middleware/auth");
const {
  Recipe,
  validateRecipe,
  generateRecipeNumber,
} = require("../models/recipe.model");
const { User } = require("../models/users.model");

route.delete("/:id", auth, async (req, res) => {
  //delete a recipe
  const recipe = await Recipe.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!recipe)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(recipe);

  let user = await User.findOne({ _id: req.user._id });
  user.recipes.pull(recipe._id);
  user.save();
});

route.put("/:id", auth, async (req, res) => {
  //update a recipe
  const { error } = validateRecipe(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let recipe = await Recipe.findOneAndUpdate(
    {
      _id: req.params.id,
      user_id: req.user._id,
    },
    req.body
  );

  if (!recipe) {
    return res.status(404).send("The recipe with the given ID is not found");
  }

  recipe = await Recipe.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(recipe);
});

route.get("/my-recipes", auth, async (req, res) => {
  //retrieve all of the recipes of a specific user
  if (!req.user._id) {
    return res.status(400).send("You are not logged in");
  }

  let recipes = await Recipe.find({ user_id: req.user._id });
  res.send(recipes);
});

route.get("/", auth, async (req, res) => {
  //get all recipes if you are logged in
  if (!req.user._id) {
    return res.status(400).send("You are not logged in");
  }

  let recipes = await Recipe.find();
  res.send(recipes);
});

route.get("/:id", auth, async (req, res) => {
  //returns a specific card for a specific user
  const recipe = await Recipe.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });

  if (!recipe) {
    return res.status(404).send("The card with the given ID is not found");
  }

  res.send(recipe);
});

route.post("/", auth, async (req, res) => {
  // add a new recipe
  const { error } = validateRecipe(req.body);
  if (error) {
    return res.status(400).json(error.details.map((err) => err.message));
  }

  let recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    picture: req.body.picture
      ? req.body.picture
      : "https://cdn.pixabay.com/photo/2016/12/26/17/28/food-1932466_1280.jpg",
    recipeNumber: await generateRecipeNumber(Recipe),
    user_id: req.user._id,
  });

  post = await recipe.save();
  res.send(post);

  let user = await User.findOne({ _id: req.user._id });
  user.recipes.push(recipe._id);
  user.save();

  return res.status(200).send({ recipe: recipe.title, _id: recipe._id });
});

module.exports = route;
