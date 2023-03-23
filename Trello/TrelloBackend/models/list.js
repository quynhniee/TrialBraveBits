const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

module.exports = mongoose.model("List", listSchema);
