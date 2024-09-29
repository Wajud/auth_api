const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Users must have a name"],
  },
  email: {
    type: String,
    required: [true, "Users must have email "],
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
    default: "Hello everyone. I am new here. It's nice to be here.",
  },
  location: {
    type: String,
    default: "Somewhere in the world",
  },
  age: {
    type: String,
    default: "age",
  },
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
