const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const { string } = require("@hapi/joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, admin: this.admin },
    process.env.JWT_TOKEN_KEY || "PrivateKey"
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = new Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    admin: Joi.boolean().required(),
  });
  return schema.validate(user, {
    abortEarly: false,
  });
}

function validateFavorites(data) {
  const schema = new Joi.object({
    favorites: Joi.array().min(1).required(),
  });
  return schema.validate(data, {
    abortEarly: false,
  });
}
module.exports = {
  User,
  validateUser,
  validateFavorites,
};
