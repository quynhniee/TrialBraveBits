const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("List", listSchema);
