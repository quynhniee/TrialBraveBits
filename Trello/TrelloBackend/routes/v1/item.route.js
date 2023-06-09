const express = require("express");
const router = express.Router();
const itemController = require("../../controllers/item.controller");

// Update item by id
router.put("/:id", itemController.update);

// Create item
router.post("/:id", itemController.add);

// Remove item
router.delete("/:listId/:id", itemController.remove);

module.exports = router;
