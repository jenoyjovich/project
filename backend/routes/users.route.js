const route = require("express").Router();
const {
  validateUser,
  User,
  validateFavorites,
} = require("../models/users.model");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");
const { Recipe } = require("../models/recipe.model");

const getRecipes = async (recipesArray) => {
  const recipes = await Recipe.find({ recipeNumber: { $in: recipesArray } });
  return recipes;
};

route.get("/all", auth, async (req, res) => {
  let foundUser = await User.find({ _id: req.user._id });
  res.json(foundUser);
});

route.get("/favorites/:search", auth, async (req, res) => {
  let search = req.params.search;
  const result = await Recipe.find(
    {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { ingredients: { $regex: search, $options: "i" } },
      ],
    },
    (err, docs) => {}
  );

  res.send(result);
});

route.get("/recipes", auth, async (req, res) => {
  if (!req.query.numbers) {
    res.status(400).send("Missing number data");
  }

  let data = {};
  data.recipes = req.query.numbers.split(",");

  const recipes = await getRecipes(data.recipes);
  res.send(recipes);
});

route.post("/favorites", auth, async (req, res) => {
  // add favorite to a user
  let user = await User.findById(req.user._id);
  let recipe = await Recipe.findById(req.body._id);
  if (!recipe) {
    return res.status(400).json("not working");
  }

  let exists = await User.findOne({ _id: req.user._id, favorites: recipe._id });
  if (exists) {
    return res
      .status(400)
      .send({ error: "This recipe is already in your favorites" });
  }

  user.favorites.push(recipe._id);
  user.save();
  res.send("added to favorites");
});
route.delete("/favorites/:recipe_id", auth, async (req, res) => {
  //delete a favorite from a user
  let user = await User.findById(req.user._id);
  let recipe = await Recipe.findById(req.params.recipe_id);
  let exists = await User.findById({
    _id: req.user._id,
    favorites: recipe._id,
  });
  if (!exists) {
    return res.status(404).send("The recipe with the given ID is not found");
  }
  res.send(recipe._id);
  user.favorites.pull(recipe._id);
  user.save();
});

route.get("/favorites", auth, async (req, res) => {
  // get all favorites of a user
  const { error } = validateFavorites(req.user.favorites);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ _id: req.user._id });

  let favorites = await Recipe.find({ _id: user.favorites });

  res.send(favorites);
});

route.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
});

route.post("/", async (req, res) => {
  //Create a user
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details.map((err) => err.message));
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already exists");
  }

  user = new User(req.body);
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const resUser = _.pick(user, ["_id", "name", "email"]);
  res.send(resUser);
});

module.exports = route;
