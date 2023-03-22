const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.route");
const listRoutes = require("./list.route");
const itemRoutes = require("./item.route");

// Auth routes
router.use("/auth", authRoutes);

// List routes
router.use("/list", listRoutes);

// Item routes
router.use("/item", itemRoutes);

module.exports = router;
