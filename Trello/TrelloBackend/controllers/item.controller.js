const express = require("express");
const Item = require("../models/item");

// Get list items
exports.get = async (req, res, next) => {
  try {
    const listId = req.params.id;
    const items = await Item.find({ listId });

    res.status(200).json(items);
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

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

    res.status(200).json(newItem);
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
