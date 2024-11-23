const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const dbConnect = require("./config/db");
const userRouter = require("./routes/userRoutes");
const recipeRouter = require("./routes/recipeRoutes");
const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API Routes
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });

// Basic Route (Health check)
app.get("/", (req, res) => {
  res.send("Recipe Management App is running");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Export for serverless functions
module.exports = app;
