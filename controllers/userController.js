const bcryptjs = require("bcryptjs");
const User = require("../models/userSchema");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndCookies");

const signup = async (req, res) => {
  let { username, email, password } = req.body;
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    let user = {
      username,
      email,
      password: hashPassword,
    };

    let data = await User.create(user);
    generateTokenAndSetCookie(data._id, res);
    res.status(201).json({ message: "Signup Successful" });
  } catch (error) {
    res.status(500).json({ message: "Error Signing Up", error: error.message });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found!!!" });
    }
    let isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid Password!!!" });
    }
    // console.log(isPasswordMatch);

    generateTokenAndSetCookie(user._id, res);
    // console.log(user._id);
    res.status(200).json({ message: "login succesful", user });
  } catch (error) {
    res.status(500).json({ message: "Error Login", error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error Logout", error: error.message });
  }
};

module.exports = { signup, login, logout };
