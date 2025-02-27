const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dbConnect = require("./config/db");
const userRouter = require("./routes/userRoutes");
const recipeRouter = require("./routes/recipeRoutes");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/recipe", recipeRouter);

app.listen(PORT, () => {
  console.log("Listening...");
  dbConnect();
});
