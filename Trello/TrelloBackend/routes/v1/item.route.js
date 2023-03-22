const express = require("express");
const router = express.Router();
const itemController = require("../../controllers/item.controller");
const isAuth = require("../../middlewares/is-auth");

// Get items by list id
router.get("/listItems/:id", isAuth, itemController.get);

// Update item by id
router.put("/:id", isAuth, itemController.update);

// Create item
router.post("/:id", isAuth, itemController.add);

module.exports = router;
