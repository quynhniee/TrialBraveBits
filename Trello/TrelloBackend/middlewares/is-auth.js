const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authError = () => {
  const error = new Error("Not authenticated.");
  error.statusCode = 401;
  throw error;
};

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) authError();
    const token = authHeader.split(" ")[1];

    let decodedToken;

    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      authError();
    }
    if (!decodedToken) authError();

    // const user = User.findById(decodedToken.userId);
    const user = await User.findOne({ _id: decodedToken.userId });
    req.user = user;

    next();
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
