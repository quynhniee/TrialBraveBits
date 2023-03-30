const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    rank: {
      type: Schema.Types.Number,
      require: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

listSchema.virtual("items", {
  ref: "Item",
  localField: "_id",
  foreignField: "listId",
});

module.exports = mongoose.model("List", listSchema);
