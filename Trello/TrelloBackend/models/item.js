const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  listId: Schema.Types.ObjectId,
});

module.exports = mongoose.model("Item", itemSchema);
