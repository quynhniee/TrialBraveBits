const Item = require("../models/item");
const List = require("../models/list");

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

    const list = await List.findById(listId);

    if (list) {
      const maxIndex = await Item.find({ listId }).sort({ rank: -1 }).limit(1);
      const rank = maxIndex[0]?.rank + 1 || 1;

      const newItem = await Item.create({ ...item, rank, listId });

      res.status(200).json(newItem);
    }
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

// Remove Item
exports.remove = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Item.findOneAndRemove({ _id: id }).exec();

    console.log("Child removed successfully");

    res.status(200).json("Delete item!");
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
