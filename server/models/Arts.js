const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Arts = new Schema(
  {
    title: String,
    price: String,
    description: String,
    image: String,
  },
  {
    collection: "arts",
  }
);
module.exports = mongoose.model("Arts", Arts);
