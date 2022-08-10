const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Arts = new Schema(
  {
    title: String,
    subTitle: String,
    paragraph: String,
    blogImage: String,
  },
  {
    collection: "arts",
  }
);
module.exports = mongoose.model("Arts", Arts);
