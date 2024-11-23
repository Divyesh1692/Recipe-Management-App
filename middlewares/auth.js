const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

require("dotenv").config();
const validate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.userId).select("-password");
    next();
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "error validating user" });
  }
};

module.exports = validate;
