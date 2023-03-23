const List = require("../models/list");
const Item = require("../models/item");

// Get all list
exports.getAll = async (req, res, next) => {
  try {
    const allList = await List.find().populate("items");

    res.status(200).json(allList);
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

// Get list by id
exports.get = async (req, res, next) => {
  try {
    const id = req.params.id;
    const list = await List.findById(id).populate("items");

    res.status(200).json(list);
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

// Create list
exports.add = async (req, res, next) => {
  try {
    const newList = req.body;
    await List.create(newList);

    res.status(200).json("Create list successfully!");
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

// Update list by id
exports.update = async (req, res, next) => {
  try {
    const listId = req.params.id;
    const updatedList = req.body;

    await List.findByIdAndUpdate(listId, updatedList);

    res.status(200).json("Update successfully");
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
