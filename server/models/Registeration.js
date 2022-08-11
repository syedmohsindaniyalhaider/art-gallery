const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Registeration = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmPassword: String,
  },
  {
    collection: "registerations",
  }
);
module.exports = mongoose.model("Registeration", Registeration);
