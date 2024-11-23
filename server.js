const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

const userRouter = require("./routes/userRouter");
const recipeRouter = require("./routes/recipeRouter");

app.use("/user", userRouter);
app.use("/recipe", recipeRouter);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Recipe Management App is running!");
});

module.exports = app;
