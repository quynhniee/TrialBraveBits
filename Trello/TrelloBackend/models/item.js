const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  rank: {
    type: Schema.Types.Number,
    require: true,
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: "List",
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
