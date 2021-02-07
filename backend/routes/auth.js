const route = require("express").Router();
const Joi = require("@hapi/joi");
const { User } = require("../models/users.model");
const bcrypt = require("bcrypt");

function validate(body) {
  schema = Joi.object({
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(body);
}

route.post("/", async (req, res) => {
  //login and set token
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or password.");
  }

  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePassword) {
    return res.status(400).send("Invalid email or password.");
  }

  res.send({ token: user.generateAuthToken() });
});

module.exports = route;
