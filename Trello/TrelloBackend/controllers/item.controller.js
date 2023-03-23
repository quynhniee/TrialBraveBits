const Item = require("../models/item");
const List = require('../models/list')

// Update item by id
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedItem = req.body;

    await Item.findOneAndUpdate({ _id: id }, updatedItem);

    res.status(200).json("Update successfully!");
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

// Add item
exports.add = async (req, res, next) => {
  try {
    const listId = req.params.id;
    const item = req.body;
    
    const newItem = await Item.create({ ...item, listId });
    const list = await List.findById(listId);

    if (list) {
      list.items.push(newItem);
      list.save();
      res.status(200).json(newItem);
    }

  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
