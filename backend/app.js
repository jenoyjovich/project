const express = require("express");
const app = express();
const users = require("./routes/users.route");
const recipes = require("./routes/recipe.route");
const auth = require("./routes/auth");
require("dotenv").config();
const cors = require("cors");

//DB CONNECTION
require("./utils/connectDB")()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("cant connect to DB", err);
  });
app.use(cors());
app.use(require("morgan")("dev"));
app.use(express.json());

//ROUTES
app.use("/api/users", users);
app.use("/api/recipes", recipes);
app.use("/api/auth", auth);

//connection
const PORT = process.env.SERVER_PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
