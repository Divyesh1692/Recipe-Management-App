const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateTokenAndSetCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { expires: new Date(Date.now() + 86400000) });
    return token;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateTokenAndSetCookie };
