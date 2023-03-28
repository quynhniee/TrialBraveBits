const List = require("../models/list");
const Item = require("../models/item");

// Get all list
exports.getAll = async (req, res, next) => {
  try {
    const allList = await List.find().sort({ rank: 1 }).populate("items");

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
    const maxIndex = await List.find().sort({ rank: -1 }).limit(1);
    console.log(maxIndex, maxIndex[0]?.rank);
    const rank = maxIndex[0]?.rank + 1 || 1;
    const list = { ...req.body, rank };
    const newList = await List.create(list);

    res.status(200).json(newList);
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

// Delete list
exports.delete = async (req, res, next) => {
  try {
    const listId = req.params.id;

    await List.findByIdAndRemove(listId);

    res.status(200).json("Delete successfully");
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
