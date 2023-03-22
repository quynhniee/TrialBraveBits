const List = require("../models/list");

// Get all list
exports.getAll = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const allList = await List.find({ userId: userId });

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
    const list = await List.findById(id);

    res.status(200).json(list);
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

// Update list by id
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedList = req.body;

    await List.findOneAndUpdate({ _id: id }, updatedList);

    res.status(200).json("Update successfully!");
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
