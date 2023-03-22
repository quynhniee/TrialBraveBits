require("dotenv/config");

const User = require("../models/user");
const Item = require("../models/item");
const List = require("../models/list");
const jwt = require("jsonwebtoken");

// Create user
exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (password.length < 8) {
      const error = new Error("Password must have min length 8!");
      error.statusCode = 403;
      throw error;
    }

    const user = await User.findOne({ username: username });

    if (user) {
      const error = new Error("Username is existed!");
      error.statusCode = 403;
      throw error;
    }

    const newUser = await User.create({
      username: username,
      password: password,
    });

    const newLists = await Item.create([
      {
        content: "Cần làm",
        userId: newUser._id,
      },
      {
        content: "Đang làm",
        userId: newUser._id,
      },
      {
        content: "Đã xong",
        userId: newUser._id,
      },
    ]);

    res.status(201).json({
      message: "Created successfully!",
      user: newUser,
      lists: newLists,
    });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      const error = new Error("Username cannot be found!");
      error.statusCode = 404;
      throw error;
    }

    if (user.password !== password) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json(token);
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
