const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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

app.use("/user", userRouter);
app.use("/recipe", recipeRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message:
      "Welcome to Recipe management app, to test this application api. use services like postman. for more information about API and its endpoint go through readme.md file.",
  });
});

app.listen(PORT, () => {
  console.log("Listening...");
  dbConnect();
});
