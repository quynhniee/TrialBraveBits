const express = require("express");
const router = express.Router();
const listRoutes = require("./list.route");
const itemRoutes = require("./item.route");

// List routes
router.use("/list", listRoutes);

// Item routes
router.use("/item", itemRoutes);

module.exports = router;
