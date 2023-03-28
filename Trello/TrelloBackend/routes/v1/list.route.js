const express = require("express");
const router = express.Router();
const listController = require("../../controllers/list.controller");

// Get all list
router.get("/", listController.getAll);

// Get list by id
router.get("/:id", listController.get);

// Update list by id
router.put("/:id", listController.update);

// Create list
router.post("/", listController.add);

// Delete list
router.delete("/:id", listController.delete);

module.exports = router;
