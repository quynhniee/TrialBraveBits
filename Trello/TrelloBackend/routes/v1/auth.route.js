const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth.controller");

// Login
router.post("/login", authController.login);

// Signup
router.post("/signup", authController.signup);

module.exports = router;
