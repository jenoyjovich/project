const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const _ = require("lodash");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  ingredients: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  directions: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024,
  },
  picture: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  recipeNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

function validateRecipe(recipe) {
  const schema = Joi.object({
    title: Joi.string().min(4).max(255).required(),
    description: Joi.string().min(4).max(255).required(),
    ingredients: Joi.string().min(4).max(255).required(),
    directions: Joi.string().min(4).max(1024).required(),
    picture: Joi.string().min(11).max(1024),
  });
  return schema.validate(recipe, { abortEarly: false });
}

async function generateRecipeNumber(Recipe) {
  while (true) {
    let randomNumber = _.random(100, 999999);
    let recipe = await Recipe.findOne({ recipeNumber: randomNumber });
    if (!recipe) return String(randomNumber);
  }
}

module.exports = {
  Recipe,
  validateRecipe,
  generateRecipeNumber,
};
