const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: "List",
  },
});

module.exports = mongoose.model("Item", itemSchema);
