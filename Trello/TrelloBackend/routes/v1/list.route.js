const express = require("express");
const router = express.Router();
const listController = require("../../controllers/list.controller");
const isAuth = require("../../middlewares/is-auth");

// Get all list
router.get("/", isAuth, listController.getAll);

// Get list by id
router.get("/:id", isAuth, listController.get);

// Update list by id
router.put("/:id", isAuth, listController.update);

module.exports = router;
